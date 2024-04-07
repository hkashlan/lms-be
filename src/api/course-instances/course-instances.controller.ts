import { Controller } from '@nestjs/common';
import { CourseInstance, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { CourseInstancesService } from './course-instances.service';

@Controller('course-instances')
export class CourseInstancesController extends RestController<
  CourseInstance,
  Prisma.CourseInstanceFindManyArgs,
  Prisma.CourseInstanceCreateInput,
  Prisma.CourseInstanceUpdateInput
> {
  constructor(courseInstanceService: CourseInstancesService) {
    super(courseInstanceService);
  }
}
