import { Controller } from '@nestjs/common';
import { CourseInstance, Prisma } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { CourseInstanceValidation } from '../../models/validation/course-instance.z';
import { CourseInstanceService } from './course-instance.service';


@Controller('course-instance')
export class CourseInstanceController extends ModelRestController<
  CourseInstance,
  Prisma.CourseInstanceFindManyArgs,
  Prisma.CourseInstanceCreateInput,
  Prisma.CourseInstanceUpdateInput
> {
  constructor(courseInstanceService: CourseInstanceService) {
    super(courseInstanceService, CourseInstanceValidation);
  }
}
