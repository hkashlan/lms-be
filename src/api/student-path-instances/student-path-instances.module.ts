import { Module } from '@nestjs/common';
import { StudentPathInstancesService } from './student-path-instances.service';
import { StudentPathInstancesController } from './student-path-instances.controller';

@Module({
  controllers: [StudentPathInstancesController],
  providers: [StudentPathInstancesService],
})
export class StudentPathInstancesModule {}
