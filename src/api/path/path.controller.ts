import { Controller } from '@nestjs/common';
import { Path, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { PathService } from './path.service';

@Controller('path')
export class PathController extends RestController<
  Path,
  Prisma.PathFindManyArgs,
  Prisma.PathCreateInput,
  Prisma.PathUpdateInput
> {
  constructor(readonly pathService: PathService) {
    super(pathService);
  }
}
