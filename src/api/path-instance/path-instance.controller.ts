import { Controller } from '@nestjs/common';
import { PathInstance, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { PathInstanceService } from './path-instance.service';

@Controller('path-instance')
export class PathInstanceController extends RestController<
  PathInstance,
  Prisma.PathInstanceFindManyArgs,
  Prisma.PathInstanceCreateInput,
  Prisma.PathInstanceUpdateInput
> {
  constructor(pathInstanceService: PathInstanceService) {
    super(pathInstanceService);
  }
}
