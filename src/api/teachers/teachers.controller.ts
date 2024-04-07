import { Controller } from '@nestjs/common';
import { Prisma, Teacher } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController extends RestController<
  Teacher,
  Prisma.TeacherFindManyArgs,
  Prisma.TeacherCreateInput,
  Prisma.TeacherUpdateInput
> {
  constructor(teacherService: TeachersService) {
    super(teacherService);
  }
}
