import { Controller } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { CourseValidation } from '../../models/validation/course.z';
import { CourseService } from './course.service';


@Controller('course')
export class CourseController extends ModelRestController<
  Course,
  Prisma.CourseFindManyArgs,
  Prisma.CourseCreateInput,
  Prisma.CourseUpdateInput
> {
  constructor(courseService: CourseService) {
    super(courseService, CourseValidation);
  }
}
