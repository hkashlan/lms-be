import { Test, TestingModule } from '@nestjs/testing';
import { QuizInstanceStudentsController } from './quiz-instance=students.controller';
import { QuizInstanceStudentsService } from './quiz-instance=students.service';

describe('QuizInstanceStudentsController', () => {
  let controller: QuizInstanceStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizInstanceStudentsController],
      providers: [QuizInstanceStudentsService],
    }).compile();

    controller = module.get<QuizInstanceStudentsController>(QuizInstanceStudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
