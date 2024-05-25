import { Module } from '@nestjs/common';
import { CourseInstanceService } from '../course-instance/course-instance.service';
import { CourseService } from '../course/course.service';
import { QuizInstanceService } from '../quiz-instance/quiz-instance.service';
import { PathInstanceController } from './path-instance.controller';
import { PathInstanceService } from './path-instance.service';

@Module({
  controllers: [PathInstanceController],
  providers: [
    PathInstanceService,
    CourseService,
    CourseInstanceService,
    QuizInstanceService,
  ],
})
export class PathInstanceModule {}
