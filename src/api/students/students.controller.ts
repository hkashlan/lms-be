import { Controller } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController extends RestController<
  Student,
  Prisma.StudentFindManyArgs,
  Prisma.StudentCreateInput,
  Prisma.StudentUpdateInput
> {
  constructor(studentService: StudentsService) {
    super(studentService);
  }
}
