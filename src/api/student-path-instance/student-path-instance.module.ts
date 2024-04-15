import { Module } from '@nestjs/common';
import { StudentPathInstanceController } from './student-path-instance.controller';
import { StudentPathInstanceService } from './student-path-instance.service';

@Module({
  controllers: [StudentPathInstanceController],
  providers: [StudentPathInstanceService],
})
export class StudentPathInstanceModule {}
