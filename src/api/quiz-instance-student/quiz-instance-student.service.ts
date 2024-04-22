
import { Injectable } from '@nestjs/common';
import { QuizInstanceStudent, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class QuizInstanceStudentService extends APIService<
  QuizInstanceStudent,
  Prisma.QuizInstanceStudentFindManyArgs,
  Prisma.QuizInstanceStudentCreateInput,
  Prisma.QuizInstanceStudentUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.quizInstanceStudent.findMany,
      findOne: db.quizInstanceStudent.findUnique,
      count: db.quizInstanceStudent.count,
      create: db.quizInstanceStudent.create,
      update: db.quizInstanceStudent.update,
      delete: db.quizInstanceStudent.delete,
    });
  }
}
