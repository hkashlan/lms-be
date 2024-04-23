import { Controller } from '@nestjs/common';
import { Prisma, QuizInstanceStudent } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { QuizInstanceStudentService } from './quiz-instance-student.service';

@Controller('quiz-instance-student')
export class QuizInstanceStudentController extends ModelRestController<
  QuizInstanceStudent,
  Prisma.QuizInstanceStudentFindManyArgs,
  Prisma.QuizInstanceStudentCreateInput,
  Prisma.QuizInstanceStudentUpdateInput
> {
  constructor(quizInstanceStudentService: QuizInstanceStudentService) {
    super(quizInstanceStudentService);
  }
}
