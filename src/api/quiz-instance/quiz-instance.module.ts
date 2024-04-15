import { Module } from '@nestjs/common';
import { QuizInstanceController } from './quizInstance.controller';
import { QuizInstanceService } from './quizInstance.service';

@Module({
  controllers: [QuizInstanceController],
  providers: [QuizInstanceService],
})
export class QuizInstanceModule {}
