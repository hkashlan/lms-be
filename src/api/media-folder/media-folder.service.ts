
import { Injectable } from '@nestjs/common';
import { MediaFolder, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class MediaFolderService extends APIService<
  MediaFolder,
  Prisma.MediaFolderFindManyArgs,
  Prisma.MediaFolderCreateInput,
  Prisma.MediaFolderUpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.mediaFolder.findMany,
      findOne: db.mediaFolder.findUnique,
      count: db.mediaFolder.count,
      create: db.mediaFolder.create,
      update: db.mediaFolder.update,
      delete: db.mediaFolder.delete,
    });
  }
}
