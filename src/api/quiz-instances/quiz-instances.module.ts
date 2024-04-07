import { Module } from '@nestjs/common';
import { QuizInstancesService } from './quiz-instances.service';
import { QuizInstancesController } from './quiz-instances.controller';

@Module({
  controllers: [QuizInstancesController],
  providers: [QuizInstancesService],
})
export class QuizInstancesModule {}
