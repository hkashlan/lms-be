import { Test, TestingModule } from '@nestjs/testing';
import { PathInstancesController } from './path-instances.controller';
import { PathInstancesService } from './path-instances.service';

describe('PathInstancesController', () => {
  let controller: PathInstancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PathInstancesController],
      providers: [PathInstancesService],
    }).compile();

    controller = module.get<PathInstancesController>(PathInstancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
