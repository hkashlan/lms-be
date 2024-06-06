import { Controller, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Media, Prisma } from '@prisma/client';
import { put } from '@vercel/blob';
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
  async uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Array<Express.Multer.File>, // Ensure correct usage of @UploadedFile
  ) {
    const file = files[0];
    if (file) {
      const fileInfo = await this.uploadFileVercel(file);
      this.apiService.update(id, {
        name: fileInfo.fileName,
        url: fileInfo.url,
        mimetype: file.mimetype,
        size: file.size,
      });
    } else {
      // Handle the case where the file is undefined
      console.error('File upload failed: file is undefined');
    }
  }

  async uploadFileVercel(file: Express.Multer.File) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileParts = file.originalname.split('.');
    const fileName = fileParts[0] + '-' + uniqueSuffix + '.' + fileParts[1];

    const { url } = await put(
      fileName,
      file.buffer,
      { access: 'public' }, // Set access as needed (public/private)
    );
    return { fileName, url };
  }
}
