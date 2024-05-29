import { Injectable } from '@nestjs/common';
import { CourseInstance, PathInstance, Prisma, QuizInstance, Student, StudentPathInstance } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';
import { Payload } from './../../auth/auth.service';
import { FinishStudentLesson, FinishStudentQuiz } from './student.controller';

@Injectable()
export class StudentService extends APIService<
  Student,
  Prisma.StudentFindManyArgs,
  Prisma.StudentCreateInput,
  Prisma.StudentUpdateInput
> {
  constructor(private db: DatabaseService) {
    super({
      findMany: db.student.findMany,
      findOne: db.student.findUnique,
      count: db.student.count,
      create: db.student.create,
      update: db.student.update,
      delete: db.student.delete,
    });
  }

  async fetchStudentCourses(user: Payload): Promise<Student> {
    return await this.db.student
      .findUnique({
        where: {
          id: user.sub,
        },
        include: {
          studentPathInstance: {
            include: {
              pathInstance: {
                include: {
                  courseInstance: {
                    include: {
                      quizzes: {
                        include: {
                          quizStudents: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
      .then((result) => result!);
  }

  async fetchOpenPath(user: Payload, today: Date): Promise<PathInstance[]> {
    const retVal = await this.db.pathInstance.findMany({
      where: {
        NOT: {
          path: {
            studentPathInstance: {
              some: {
                studentId: user.sub,
              },
            },
          },
        },
        dateFrom: {
          lte: today,
        },
        dateTo: {
          gte: today,
        },
        numberOfRegisteredStudents: {
          lte: this.db.pathInstance.fields.numberOfStudents,
        },
      },
    });
    console.log('retVal', JSON.stringify(retVal, null, 2));
    return retVal;
  }

  async registerStudent(user: Payload, pathInstanceId: number): Promise<StudentPathInstance> {
    const pathInstance = await this.db.pathInstance.findUnique({ where: { id: pathInstanceId } });
    const data: Omit<Prisma.StudentPathInstanceCreateInput, 'student' | 'pathInstance' | 'path'> & {
      studentId: number;
      pathInstanceId: number;
      pathId: number;
    } = {
      mark: 0,
      fullMark: 0,
      studentId: user.sub,
      studentName: user.name,
      pathInstanceName: pathInstance!.name,
      pathInstanceId: pathInstance!.id,
      pathName: pathInstance!.pathName,
      pathId: pathInstance!.pathId,
      createdUserName: user.name,
      createdUserId: user.sub,
      createdDate: new Date(),
      updatedUserName: user.name,
      updatedUserId: user.sub,
      updatedDate: new Date(),
    };
    const studentPathInstance = await this.db.studentPathInstance.create({
      data: data as unknown as Prisma.StudentPathInstanceCreateInput,
    });

    return studentPathInstance;
  }

  async finishExams(user: Payload, createUserDto: FinishStudentQuiz): Promise<QuizInstance> {
    const { fullMark, mark, answeredOptions, quizzId } = createUserDto;
    const quizInstance = await this.db.quizInstance.findUnique({
      where: {
        id: quizzId,
      },
      include: {
        quizStudents: true,
      },
    });
    const quizStudent = quizInstance?.quizStudents.find((student) => student.studentId === user.sub);

    if (!quizStudent) {
      throw new Error('Quiz student not found');
    }
    await this.db.quizInstanceStudent.update({
      where: {
        id: quizStudent.id,
      },
      data: {
        fullMark: 0,
        mark: 0,
        date: new Date(),
        quizId: quizInstance?.id,
        quizName: quizInstance?.name,
        studentId: user.sub,
        studentName: user.name,
        answerOptions: answeredOptions,
        createdUserName: user.name,
        createdUserId: user.sub,
        createdDate: new Date(),
        updatedUserName: user.name,
        updatedUserId: user.sub,
        updatedDate: new Date(),
      },
    });
    return quizInstance!;
  }

  async finishLesson(user: Payload, createUserDto: FinishStudentLesson): Promise<CourseInstance> {
    const { courseId, lessonId, done, mark, answeredOptions } = createUserDto;

    const courseInstance = await this.db.courseInstance.findUnique({
      where: { id: courseId },
      include: {
        lessons: {
          where: { id: lessonId },
          include: {
            students: true,
          },
        },
      },
    });

    if (!courseInstance) {
      throw new Error('Course instance not found');
    }

    const lesson = courseInstance.lessons[0];
    if (!lesson) {
      throw new Error('Lesson not found');
    }

    const studentIndex = lesson.students.findIndex((student) => student.id === user.sub);

    if (studentIndex !== -1) {
      lesson.students[studentIndex].done = done;
      lesson.students[studentIndex].mark = mark;
      lesson.students[studentIndex].answeredOptions = answeredOptions;
    } else {
      const student = {
        id: user.sub,
        done: true,
        mark: 50,
        answeredOptions: [],
      };
      lesson.students.push(student);
    }

    const updatedCourseInstance = await this.db.courseInstance.update({
      where: { id: courseId },
      data: {
        lessons: {
          update: {
            where: { id: lessonId },
            data: {
              students: {
                upsert: {
                  create: students,
                  update: students,
                },
              },
            },
          },
        },
      },
      include: {
        lessons: {
          include: {
            students: true,
          },
        },
      },
    });

    return updatedCourseInstance;
  }
}
