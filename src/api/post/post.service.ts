import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class PostService extends APIService<
  Post,
  Prisma.PostFindManyArgs,
  Prisma.PostCreateInput,
  Prisma.PostUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.post.findMany,
      findOne: db.post.findUnique,
      count: db.post.count,
      create: db.post.create,
      update: db.post.update,
      delete: db.post.delete,
    });
  }
}
