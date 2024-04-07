import { Controller } from '@nestjs/common';
import { Prisma, QuizInstanceStudent } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { QuizInstanceStudentsService } from './quiz-instance=students.service';

@Controller('quiz-instances')
export class QuizInstanceStudentsController extends RestController<
  QuizInstanceStudent,
  Prisma.QuizInstanceStudentFindManyArgs,
  Prisma.QuizInstanceStudentCreateInput,
  Prisma.QuizInstanceStudentUpdateInput
> {
  constructor(quizInstanceStudentService: QuizInstanceStudentsService) {
    super(quizInstanceStudentService);
  }
}
