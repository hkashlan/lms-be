import { Test, TestingModule } from '@nestjs/testing';
import { QuizInstancesService } from './quiz-instances.service';

describe('QuizInstancesService', () => {
  let service: QuizInstancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizInstancesService],
    }).compile();

    service = module.get<QuizInstancesService>(QuizInstancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
