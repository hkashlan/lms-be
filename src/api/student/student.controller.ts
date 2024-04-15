import { Controller } from '@nestjs/common';
import { Student, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController extends RestController<
  Student,
  Prisma.StudentFindManyArgs,
  Prisma.StudentCreateInput,
  Prisma.StudentUpdateInput
> {
  constructor(readonly studentService: StudentService) {
    super(studentService);
  }
}
