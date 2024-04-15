import { Controller } from '@nestjs/common';
import { CourseInstance, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { CourseInstanceService } from './courseInstance.service';

@Controller('courseInstance')
export class CourseInstanceController extends RestController<
  CourseInstance,
  Prisma.CourseInstanceFindManyArgs,
  Prisma.CourseInstanceCreateInput,
  Prisma.CourseInstanceUpdateInput
> {
  constructor(readonly pathService: CourseInstanceService) {
    super(courseInstanceService);
  }
}
