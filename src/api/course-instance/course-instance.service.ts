
import { Injectable } from '@nestjs/common';
import { CourseInstance, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class CourseInstanceService extends APIService<
  CourseInstance,
  Prisma.CourseInstanceFindManyArgs,
  Prisma.CourseInstanceCreateInput,
  Prisma.CourseInstanceUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.courseInstance.findMany,
      findOne: db.courseInstance.findUnique,
      count: db.courseInstance.count,
      create: db.courseInstance.create,
      update: db.courseInstance.update,
      delete: db.courseInstance.delete,
    });
  }
}
