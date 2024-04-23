import { Controller } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController extends ModelRestController<
  Student,
  Prisma.StudentFindManyArgs,
  Prisma.StudentCreateInput,
  Prisma.StudentUpdateInput
> {
  constructor(studentService: StudentService) {
    super(studentService);
  }
}
