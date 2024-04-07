import { Controller } from '@nestjs/common';
import { PathInstance, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { PathInstancesService } from './path-instances.service';

@Controller('path-instances')
export class PathInstancesController extends RestController<
  PathInstance,
  Prisma.PathInstanceFindManyArgs,
  Prisma.PathInstanceCreateInput,
  Prisma.PathInstanceUpdateInput
> {
  constructor(pathInstancesService: PathInstancesService) {
    super(pathInstancesService);
  }
}
