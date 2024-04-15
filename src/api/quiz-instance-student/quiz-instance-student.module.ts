import { Module } from '@nestjs/common';
import { QuizInstanceStudentController } from './quizInstanceStudent.controller';
import { QuizInstanceStudentService } from './quizInstanceStudent.service';

@Module({
  controllers: [QuizInstanceStudentController],
  providers: [QuizInstanceStudentService],
})
export class QuizInstanceStudentModule {}
