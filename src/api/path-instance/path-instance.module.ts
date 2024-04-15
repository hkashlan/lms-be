import { Module } from '@nestjs/common';
import { PathInstanceController } from './pathInstance.controller';
import { PathInstanceService } from './pathInstance.service';

@Module({
  controllers: [PathInstanceController],
  providers: [PathInstanceService],
})
export class PathInstanceModule {}
