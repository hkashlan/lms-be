import { Module } from '@nestjs/common';
import { QuizInstanceStudentsService } from './quiz-instance=students.service';
import { QuizInstanceStudentsController } from './quiz-instance=students.controller';

@Module({
  controllers: [QuizInstanceStudentsController],
  providers: [QuizInstanceStudentsService],
})
export class QuizInstanceStudentsModule {}
