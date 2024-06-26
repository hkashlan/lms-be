
import { Injectable } from '@nestjs/common';
import { Teacher, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class TeacherService extends APIService<
  Teacher,
  Prisma.TeacherFindManyArgs,
  Prisma.TeacherCreateInput,
  Prisma.TeacherUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.teacher.findMany,
      findOne: db.teacher.findUnique,
      count: db.teacher.count,
      create: db.teacher.create,
      update: db.teacher.update,
      delete: db.teacher.delete,
    });
  }
}
