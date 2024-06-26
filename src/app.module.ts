import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CourseInstanceModule } from './api/course-instance/course-instance.module';
import { CourseModule } from './api/course/course.module';
import { MediaFolderModule } from './api/media-folder/media-folder.module';
import { MediaModule } from './api/media/media.module';
import { PathInstanceModule } from './api/path-instance/path-instance.module';
import { PathModule } from './api/path/path.module';
import { QuizInstanceStudentModule } from './api/quiz-instance-student/quiz-instance-student.module';
import { QuizInstanceModule } from './api/quiz-instance/quiz-instance.module';
import { StudentPathInstanceModule } from './api/student-path-instance/student-path-instance.module';
import { StudentModule } from './api/student/student.module';
import { TeacherModule } from './api/teacher/teacher.module';
import { UserModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { DatabaseModule } from './core/database/database.module';
import { storage } from './storage';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
    }),
    MulterModule.register({
      storage: storage,
    }),
    DatabaseModule,
    PathModule,
    PathInstanceModule,
    CourseModule,
    CourseInstanceModule,
    StudentPathInstanceModule,
    StudentModule,
    QuizInstanceModule,
    QuizInstanceStudentModule,
    TeacherModule,
    UserModule,
    MediaModule,
    MediaFolderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
