import { Module } from '@nestjs/common';
import { PathModule } from './api/path/path.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [DatabaseModule, PathModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
