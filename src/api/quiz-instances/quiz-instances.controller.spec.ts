import { Test, TestingModule } from '@nestjs/testing';
import { QuizInstancesController } from './quiz-instances.controller';
import { QuizInstancesService } from './quiz-instances.service';

describe('QuizInstancesController', () => {
  let controller: QuizInstancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizInstancesController],
      providers: [QuizInstancesService],
    }).compile();

    controller = module.get<QuizInstancesController>(QuizInstancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
