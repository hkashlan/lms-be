import { Controller } from '@nestjs/common';
import { QuizInstance, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { QuizInstanceService } from './quiz-instance.service';

@Controller('quiz-instance')
export class QuizInstanceController extends RestController<
  QuizInstance,
  Prisma.QuizInstanceFindManyArgs,
  Prisma.QuizInstanceCreateInput,
  Prisma.QuizInstanceUpdateInput
> {
  constructor(quizInstanceService: QuizInstanceService) {
    super(quizInstanceService);
  }
}
