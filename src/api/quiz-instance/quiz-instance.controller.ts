import { Controller } from '@nestjs/common';
import { QuizInstance, Prisma } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { QuizInstanceValidation } from '../../models/validation/quiz-instance.z';
import { QuizInstanceService } from './quiz-instance.service';


@Controller('quiz-instance')
export class QuizInstanceController extends ModelRestController<
  QuizInstance,
  Prisma.QuizInstanceFindManyArgs,
  Prisma.QuizInstanceCreateInput,
  Prisma.QuizInstanceUpdateInput
> {
  constructor(quizInstanceService: QuizInstanceService) {
    super(quizInstanceService, QuizInstanceValidation);
  }
}
