import { Injectable } from '@nestjs/common';
import { PathInstance, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class PathInstancesService extends APIService<
  PathInstance,
  Prisma.PathInstanceFindManyArgs,
  Prisma.PathInstanceCreateInput,
  Prisma.PathInstanceUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.pathInstance.findMany,
      findOne: db.pathInstance.findUnique,
      count: db.pathInstance.count,
      create: db.pathInstance.create,
      update: db.pathInstance.update,
      delete: db.pathInstance.delete,
    });
  }
}
