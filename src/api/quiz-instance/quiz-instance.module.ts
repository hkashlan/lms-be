import { Module } from '@nestjs/common';
import { QuizInstanceController } from './quiz-instance.controller';
import { QuizInstanceService } from './quiz-instance.service';

@Module({
  controllers: [QuizInstanceController],
  providers: [QuizInstanceService],
})
export class QuizInstanceModule {}
