import { Controller } from '@nestjs/common';
import { Prisma, StudentPathInstance } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { StudentPathInstanceService } from './student-path-instance.service';

@Controller('student-path-instance')
export class StudentPathInstanceController extends ModelRestController<
  StudentPathInstance,
  Prisma.StudentPathInstanceFindManyArgs,
  Prisma.StudentPathInstanceCreateInput,
  Prisma.StudentPathInstanceUpdateInput
> {
  constructor(studentPathInstanceService: StudentPathInstanceService) {
    super(studentPathInstanceService);
  }
}
