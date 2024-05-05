import { Injectable } from '@nestjs/common';
import { Media, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class MediaService extends APIService<
  Media,
  Prisma.MediaFindManyArgs,
  Prisma.MediaCreateInput,
  Prisma.MediaUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.media.findMany,
      findOne: db.media.findUnique,
      count: db.media.count,
      create: db.media.create,
      update: db.media.update,
      delete: db.media.delete,
    });
  }
}
