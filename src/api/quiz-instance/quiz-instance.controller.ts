import { Controller } from '@nestjs/common';
import { QuizInstance, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { QuizInstanceService } from './quizInstance.service';

@Controller('quizInstance')
export class QuizInstanceController extends RestController<
  QuizInstance,
  Prisma.QuizInstanceFindManyArgs,
  Prisma.QuizInstanceCreateInput,
  Prisma.QuizInstanceUpdateInput
> {
  constructor(readonly pathService: QuizInstanceService) {
    super(quizInstanceService);
  }
}
