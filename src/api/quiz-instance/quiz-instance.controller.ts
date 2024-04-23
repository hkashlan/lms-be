import { Controller } from '@nestjs/common';
import { Prisma, QuizInstance } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { QuizInstanceService } from './quiz-instance.service';

@Controller('quiz-instance')
export class QuizInstanceController extends ModelRestController<
  QuizInstance,
  Prisma.QuizInstanceFindManyArgs,
  Prisma.QuizInstanceCreateInput,
  Prisma.QuizInstanceUpdateInput
> {
  constructor(quizInstanceService: QuizInstanceService) {
    super(quizInstanceService);
  }
}
