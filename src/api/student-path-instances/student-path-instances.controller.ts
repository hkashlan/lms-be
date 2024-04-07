import { Controller } from '@nestjs/common';
import { Prisma, StudentPathInstance } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { StudentPathInstancesService } from './student-path-instances.service';

@Controller('student-path-instances')
export class StudentPathInstancesController extends RestController<
  StudentPathInstance,
  Prisma.StudentPathInstanceFindManyArgs,
  Prisma.StudentPathInstanceCreateInput,
  Prisma.StudentPathInstanceUpdateInput
> {
  constructor(studentPathInstanceService: StudentPathInstancesService) {
    super(studentPathInstanceService);
  }
}
