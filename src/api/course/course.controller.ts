import { Controller } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController extends RestController<
  Course,
  Prisma.CourseFindManyArgs,
  Prisma.CourseCreateInput,
  Prisma.CourseUpdateInput
> {
  constructor(courseService: CourseService) {
    super(courseService);
  }
}
