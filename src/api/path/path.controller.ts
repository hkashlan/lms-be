import { Controller } from '@nestjs/common';
import { Path, Prisma } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { PathValidation } from '../../models/validation/path.z';
import { PathService } from './path.service';


@Controller('path')
export class PathController extends ModelRestController<
  Path,
  Prisma.PathFindManyArgs,
  Prisma.PathCreateInput,
  Prisma.PathUpdateInput
> {
  constructor(pathService: PathService) {
    super(pathService, PathValidation);
  }
}
