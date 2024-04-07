import { Test, TestingModule } from '@nestjs/testing';
import { StudentPathInstancesService } from './student-path-instances.service';

describe('StudentPathInstancesService', () => {
  let service: StudentPathInstancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentPathInstancesService],
    }).compile();

    service = module.get<StudentPathInstancesService>(StudentPathInstancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
