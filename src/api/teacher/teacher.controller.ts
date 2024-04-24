import { Controller } from '@nestjs/common';
import { Teacher, Prisma } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { TeacherValidation } from '../../models/validation/teacher.z';
import { TeacherService } from './teacher.service';


@Controller('teacher')
export class TeacherController extends ModelRestController<
  Teacher,
  Prisma.TeacherFindManyArgs,
  Prisma.TeacherCreateInput,
  Prisma.TeacherUpdateInput
> {
  constructor(teacherService: TeacherService) {
    super(teacherService, TeacherValidation);
  }
}
