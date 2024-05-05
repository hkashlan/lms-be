import { Module } from '@nestjs/common';
import { MediaFolderController } from './media-folder.controller';
import { MediaFolderService } from './media-folder.service';

@Module({
  controllers: [MediaFolderController],
  providers: [MediaFolderService],
})
export class MediaFolderModule {}
