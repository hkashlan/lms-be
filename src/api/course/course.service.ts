
import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class CourseService extends APIService<
  Course,
  Prisma.CourseFindManyArgs,
  Prisma.CourseCreateInput,
  Prisma.CourseUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.course.findMany,
      findOne: db.course.findUnique,
      count: db.course.count,
      create: db.course.create,
      update: db.course.update,
      delete: db.course.delete,
    });
  }
}
