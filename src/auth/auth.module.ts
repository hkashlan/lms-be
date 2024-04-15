import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TeachersModule } from '../api/teachers/teachers.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TeachersModule,
    JwtModule.register({
      global: true,
      secret: process.env.jwtSecret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
