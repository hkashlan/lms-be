import { Module } from '@nestjs/common';
import { StudentPathInstanceController } from './studentPathInstance.controller';
import { StudentPathInstanceService } from './studentPathInstance.service';

@Module({
  controllers: [StudentPathInstanceController],
  providers: [StudentPathInstanceService],
})
export class StudentPathInstanceModule {}
