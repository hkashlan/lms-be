import { Controller } from '@nestjs/common';
import { PathInstance, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { PathInstanceService } from './pathInstance.service';

@Controller('pathInstance')
export class PathInstanceController extends RestController<
  PathInstance,
  Prisma.PathInstanceFindManyArgs,
  Prisma.PathInstanceCreateInput,
  Prisma.PathInstanceUpdateInput
> {
  constructor(readonly pathService: PathInstanceService) {
    super(pathInstanceService);
  }
}
