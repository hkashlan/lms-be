import { Controller } from '@nestjs/common';
import { StudentPathInstance, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { StudentPathInstanceService } from './student-path-instance.service';

@Controller('student-path-instance')
export class StudentPathInstanceController extends RestController<
  StudentPathInstance,
  Prisma.StudentPathInstanceFindManyArgs,
  Prisma.StudentPathInstanceCreateInput,
  Prisma.StudentPathInstanceUpdateInput
> {
  constructor(studentPathInstanceService: StudentPathInstanceService) {
    super(studentPathInstanceService);
  }
}
