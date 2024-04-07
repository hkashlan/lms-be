import { Controller } from '@nestjs/common';
import { Prisma, QuizInstance } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { QuizInstancesService } from './quiz-instances.service';

@Controller('quiz-instances')
export class QuizInstancesController extends RestController<
  QuizInstance,
  Prisma.QuizInstanceFindManyArgs,
  Prisma.QuizInstanceCreateInput,
  Prisma.QuizInstanceUpdateInput
> {
  constructor(quizInstanceService: QuizInstancesService) {
    super(quizInstanceService);
  }
}
