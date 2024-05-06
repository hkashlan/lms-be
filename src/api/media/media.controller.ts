import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Media, Prisma } from '@prisma/client';
import { Public } from '../../auth/constants';
import { ModelRestController } from '../../core/api/model.controller';
import { MediaValidation } from '../../models/validation/media.z';
import { storage } from '../../storage';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController extends ModelRestController<
  Media,
  Prisma.MediaFindManyArgs,
  Prisma.MediaCreateInput,
  Prisma.MediaUpdateInput
> {
  constructor(mediaService: MediaService) {
    super(mediaService, MediaValidation);
  }

  @Post('upload/:id')
  @Public()
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: storage,
    }),
  )
  // @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Array<Express.Multer.File>, // Ensure correct usage of @UploadedFile
  ) {
    const file = files[0];
    if (file) {
      this.apiService.update(id, {
        name: file.filename,
        url: file.path, // Assuming you have defined 'url' in your media entity
        mimetype: file.mimetype,
        size: file.size,
      });
    } else {
      // Handle the case where the file is undefined
      console.error('File upload failed: file is undefined');
    }
  }
}
