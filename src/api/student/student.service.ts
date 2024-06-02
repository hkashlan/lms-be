import { Injectable } from '@nestjs/common';
import {
  CourseInstance,
  PathInstance,
  Prisma,
  QuizInstanceStudent,
  Student,
  StudentPathInstance,
} from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';
import { Lesson } from '../../models/schema';
import { Payload } from './../../auth/auth.service';
import { FinishStudentLesson } from './student.controller';

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

  async finishExam(user: Payload, quizInstanceStudent: QuizInstanceStudent): Promise<QuizInstanceStudent> {
    return await this.db.quizInstanceStudent.create({
      data: quizInstanceStudent as unknown as Prisma.QuizInstanceStudentCreateInput,
    });
  }

  async updateLessonStudent(user: Payload, finishStudentLesson: FinishStudentLesson): Promise<CourseInstance> {
    const courseInstance = await this.db.courseInstance.findUnique({
      where: { id: finishStudentLesson.courseId },
    });

    if (!courseInstance) {
      throw new Error('Course instance not found');
    }

    const lessons = courseInstance.lessons || [];
    const lesson = lessons?.[finishStudentLesson.lessonId] as Lesson;
    if (!lesson) {
      throw new Error('Lesson not found');
    }

    const studentIndex = lesson.students.findIndex((student) => student.studentId === user.sub);

    if (studentIndex !== -1) {
      lesson.students.push(finishStudentLesson.studentLesson);
    } else {
      lesson.students[studentIndex] = finishStudentLesson.studentLesson;
    }

    const updatedCourseInstance = await this.db.courseInstance.update({
      where: { id: courseInstance.courseId },
      data: {
        lessons: lessons,
      },
    });

    return updatedCourseInstance;
  }
}
