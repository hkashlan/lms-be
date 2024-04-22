import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TeacherService } from '../api/teacher/teacher.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.jwtSecret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, TeacherService],
  controllers: [AuthController],
})
export class AuthModule {}
