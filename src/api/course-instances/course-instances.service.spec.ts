import { Test, TestingModule } from '@nestjs/testing';
import { CourseInstancesService } from './course-instances.service';

describe('CourseInstancesService', () => {
  let service: CourseInstancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseInstancesService],
    }).compile();

    service = module.get<CourseInstancesService>(CourseInstancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
