import { Controller } from '@nestjs/common';
import { MediaFolder, Prisma } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { MediaFolderValidation } from '../../models/validation/media-folder.z';
import { MediaFolderService } from './media-folder.service';


@Controller('media-folder')
export class MediaFolderController extends ModelRestController<
  MediaFolder,
  Prisma.MediaFolderFindManyArgs,
  Prisma.MediaFolderCreateInput,
  Prisma.MediaFolderUpdateInput
> {
  constructor(mediaFolderService: MediaFolderService) {
    super(mediaFolderService, MediaFolderValidation);
  }
}
