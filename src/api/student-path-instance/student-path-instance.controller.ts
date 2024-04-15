import { Controller } from '@nestjs/common';
import { StudentPathInstance, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { StudentPathInstanceService } from './studentPathInstance.service';

@Controller('studentPathInstance')
export class StudentPathInstanceController extends RestController<
  StudentPathInstance,
  Prisma.StudentPathInstanceFindManyArgs,
  Prisma.StudentPathInstanceCreateInput,
  Prisma.StudentPathInstanceUpdateInput
> {
  constructor(readonly pathService: StudentPathInstanceService) {
    super(studentPathInstanceService);
  }
}
