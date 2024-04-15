import { Module } from '@nestjs/common';
import { PathInstanceController } from './path-instance.controller';
import { PathInstanceService } from './path-instance.service';

@Module({
  controllers: [PathInstanceController],
  providers: [PathInstanceService],
})
export class PathInstanceModule {}
