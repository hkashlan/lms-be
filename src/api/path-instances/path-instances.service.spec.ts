import { Test, TestingModule } from '@nestjs/testing';
import { PathInstancesService } from './path-instances.service';

describe('PathInstancesService', () => {
  let service: PathInstancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathInstancesService],
    }).compile();

    service = module.get<PathInstancesService>(PathInstancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
