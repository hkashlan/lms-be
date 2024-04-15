import { Test, TestingModule } from '@nestjs/testing';
import { QuizInstanceStudentsService } from './quiz-instance=students.service';

describe('QuizInstanceStudentsService', () => {
  let service: QuizInstanceStudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizInstanceStudentsService],
    }).compile();

    service = module.get<QuizInstanceStudentsService>(QuizInstanceStudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
