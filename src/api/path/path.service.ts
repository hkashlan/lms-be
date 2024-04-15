
import { Injectable } from '@nestjs/common';
import { Path, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class PathService extends APIService<
  Path,
  Prisma.PathFindManyArgs,
  Prisma.PathCreateInput,
  Prisma.PathUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.path.findMany,
      findOne: db.path.findUnique,
      count: db.path.count,
      create: db.path.create,
      update: db.path.update,
      delete: db.path.delete,
    });
  }
}
