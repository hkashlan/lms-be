import { Injectable } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
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
}
