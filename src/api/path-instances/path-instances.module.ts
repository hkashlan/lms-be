import { Module } from '@nestjs/common';
import { PathInstancesService } from './path-instances.service';
import { PathInstancesController } from './path-instances.controller';

@Module({
  controllers: [PathInstancesController],
  providers: [PathInstancesService],
})
export class PathInstancesModule {}
