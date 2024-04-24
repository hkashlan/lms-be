import { Controller } from '@nestjs/common';
import { Student, Prisma } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { StudentValidation } from '../../models/validation/student.z';
import { StudentService } from './student.service';


@Controller('student')
export class StudentController extends ModelRestController<
  Student,
  Prisma.StudentFindManyArgs,
  Prisma.StudentCreateInput,
  Prisma.StudentUpdateInput
> {
  constructor(studentService: StudentService) {
    super(studentService, StudentValidation);
  }
}
