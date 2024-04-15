import { Controller } from '@nestjs/common';
import { QuizInstanceStudent, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { QuizInstanceStudentService } from './quizInstanceStudent.service';

@Controller('quizInstanceStudent')
export class QuizInstanceStudentController extends RestController<
  QuizInstanceStudent,
  Prisma.QuizInstanceStudentFindManyArgs,
  Prisma.QuizInstanceStudentCreateInput,
  Prisma.QuizInstanceStudentUpdateInput
> {
  constructor(readonly pathService: QuizInstanceStudentService) {
    super(quizInstanceStudentService);
  }
}
