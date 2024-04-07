import { Controller } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController extends RestController<
  Course,
  Prisma.CourseFindManyArgs,
  Prisma.CourseCreateInput,
  Prisma.CourseUpdateInput
> {
  constructor(courseService: CoursesService) {
    super(courseService);
  }
}
