import { Controller } from '@nestjs/common';
import { CourseInstance, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { CourseInstanceService } from './course-instance.service';

@Controller('course-instance')
export class CourseInstanceController extends RestController<
  CourseInstance,
  Prisma.CourseInstanceFindManyArgs,
  Prisma.CourseInstanceCreateInput,
  Prisma.CourseInstanceUpdateInput
> {
  constructor(courseInstanceService: CourseInstanceService) {
    super(courseInstanceService);
  }
}
