import { Test, TestingModule } from '@nestjs/testing';
import { CourseInstancesController } from './course-instances.controller';
import { CourseInstancesService } from './course-instances.service';

describe('CourseInstancesController', () => {
  let controller: CourseInstancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseInstancesController],
      providers: [CourseInstancesService],
    }).compile();

    controller = module.get<CourseInstancesController>(CourseInstancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
