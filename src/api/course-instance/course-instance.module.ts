import { Module } from '@nestjs/common';
import { CourseInstanceController } from './courseInstance.controller';
import { CourseInstanceService } from './courseInstance.service';

@Module({
  controllers: [CourseInstanceController],
  providers: [CourseInstanceService],
})
export class CourseInstanceModule {}
