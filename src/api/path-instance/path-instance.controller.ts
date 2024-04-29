import { Controller } from '@nestjs/common';
import { PathInstance, Prisma } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { PathInstanceValidation } from '../../models/validation/path-instance.z';
import { PathInstanceService } from './path-instance.service';


@Controller('path-instance')
export class PathInstanceController extends ModelRestController<
  PathInstance,
  Prisma.PathInstanceFindManyArgs,
  Prisma.PathInstanceCreateInput,
  Prisma.PathInstanceUpdateInput
> {
  constructor(pathInstanceService: PathInstanceService) {
    super(pathInstanceService, PathInstanceValidation);
  }
}
