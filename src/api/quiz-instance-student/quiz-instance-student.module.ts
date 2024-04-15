import { Module } from '@nestjs/common';
import { QuizInstanceStudentController } from './quiz-instance-student.controller';
import { QuizInstanceStudentService } from './quiz-instance-student.service';

@Module({
  controllers: [QuizInstanceStudentController],
  providers: [QuizInstanceStudentService],
})
export class QuizInstanceStudentModule {}
