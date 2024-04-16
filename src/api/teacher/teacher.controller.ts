import { Controller } from '@nestjs/common';
import { Teacher, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController extends RestController<
  Teacher,
  Prisma.TeacherFindManyArgs,
  Prisma.TeacherCreateInput,
  Prisma.TeacherUpdateInput
> {
  constructor(teacherService: TeacherService) {
    super(teacherService);
  }
}
