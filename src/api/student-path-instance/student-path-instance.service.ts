
import { Injectable } from '@nestjs/common';
import { StudentPathInstance, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class StudentPathInstanceService extends APIService<
  StudentPathInstance,
  Prisma.StudentPathInstanceFindManyArgs,
  Prisma.StudentPathInstanceCreateInput,
  Prisma.StudentPathInstanceUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.studentPathInstance.findMany,
      findOne: db.studentPathInstance.findUnique,
      count: db.studentPathInstance.count,
      create: db.studentPathInstance.create,
      update: db.studentPathInstance.update,
      delete: db.studentPathInstance.delete,
    });
  }
}
