
import { Injectable } from '@nestjs/common';
import { QuizInstance, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class QuizInstanceService extends APIService<
  QuizInstance,
  Prisma.QuizInstanceFindManyArgs,
  Prisma.QuizInstanceCreateInput,
  Prisma.QuizInstanceUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.quizInstance.findMany,
      findOne: db.quizInstance.findUnique,
      count: db.quizInstance.count,
      create: db.quizInstance.create,
      update: db.quizInstance.update,
      delete: db.quizInstance.delete,
    });
  }
}
