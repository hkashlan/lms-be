import { Module } from '@nestjs/common';
import { CourseInstancesService } from './course-instances.service';
import { CourseInstancesController } from './course-instances.controller';

@Module({
  controllers: [CourseInstancesController],
  providers: [CourseInstancesService],
})
export class CourseInstancesModule {}
