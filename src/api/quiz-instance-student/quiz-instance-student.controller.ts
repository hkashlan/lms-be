import { Controller } from '@nestjs/common';
import { QuizInstanceStudent, Prisma } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { QuizInstanceStudentValidation } from '../../models/validation/quiz-instance-student.z';
import { QuizInstanceStudentService } from './quiz-instance-student.service';


@Controller('quiz-instance-student')
export class QuizInstanceStudentController extends ModelRestController<
  QuizInstanceStudent,
  Prisma.QuizInstanceStudentFindManyArgs,
  Prisma.QuizInstanceStudentCreateInput,
  Prisma.QuizInstanceStudentUpdateInput
> {
  constructor(quizInstanceStudentService: QuizInstanceStudentService) {
    super(quizInstanceStudentService, QuizInstanceStudentValidation);
  }
}
