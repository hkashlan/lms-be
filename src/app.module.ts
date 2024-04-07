import { Module } from '@nestjs/common';
import { CourseInstancesModule } from './api/course-instances/course-instances.module';
import { CoursesModule } from './api/courses/courses.module';
import { PathInstancesModule } from './api/path-instances/path-instances.module';
import { PathModule } from './api/path/path.module';
import { QuizInstanceStudentsModule } from './api/quiz-instance=students/quiz-instance=students.module';
import { QuizInstancesModule } from './api/quiz-instances/quiz-instances.module';
import { StudentPathInstancesModule } from './api/student-path-instances/student-path-instances.module';
import { StudentsModule } from './api/students/students.module';
import { TeachersModule } from './api/teachers/teachers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PathModule,
    PathInstancesModule,
    CoursesModule,
    CourseInstancesModule,
    StudentPathInstancesModule,
    StudentsModule,
    QuizInstancesModule,
    QuizInstanceStudentsModule,
    TeachersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
