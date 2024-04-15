import { Test, TestingModule } from '@nestjs/testing';
import { StudentPathInstancesController } from './student-path-instances.controller';
import { StudentPathInstancesService } from './student-path-instances.service';

describe('StudentPathInstancesController', () => {
  let controller: StudentPathInstancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentPathInstancesController],
      providers: [StudentPathInstancesService],
    }).compile();

    controller = module.get<StudentPathInstancesController>(StudentPathInstancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
