import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class UserService extends APIService<
  User,
  Prisma.UserFindManyArgs,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.user.findMany,
      findOne: db.user.findUnique,
      count: db.user.count,
      create: db.user.create,
      update: db.user.update,
      delete: db.user.delete,
    });
  }
}
