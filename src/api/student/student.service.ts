import { Injectable } from '@nestjs/common';
import { PathInstance, Prisma, Student } from '@prisma/client';
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
    return await this.db.pathInstance.findMany({
      where: {
        NOT: {
          studentPathInstance: {
            some: {
              studentId: user.sub,
            },
          },
        },
        stilOpen: true,
        dateFrom: {
          lte: today,
        },
        dateTo: {
          gte: today,
        },
        numberOfRegisteredStudents: {
          lt: {
            numberOfStudents: true,
          },
        },
      },
    });
  }

  async registerStudent(user: Payload, pathInstanceId?: number): Promise<PathInstance> {
    return await this.db.studentPathInstance.create({
      data: {
        mark: 100,
        studentId: user.sub,
        studentName: user.name,
        pathInstanceName: '',
        pathId: 2,
        pathName: '',
        createdDate: '',
        updatedDate: '',
        createdUserName: '',
        createdUserId: 1,
        updatedUserName: '',
        updatedUserId: 1,
      },
      pathInstanceId: pathInstanceId,
    });
  }
}
