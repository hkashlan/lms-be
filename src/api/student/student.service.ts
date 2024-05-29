import { Injectable } from '@nestjs/common';
import { PathInstance, Prisma, Student, StudentPathInstance } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';
import { Payload } from './../../auth/auth.service';

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
}
