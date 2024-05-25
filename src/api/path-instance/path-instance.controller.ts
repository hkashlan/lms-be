import { Body, Controller, Post } from '@nestjs/common';
import { Course, CourseInstance, PathInstance, Prisma, QuizInstance } from '@prisma/client';
import { Payload } from '../../auth/auth.service';
import { CurrentUser } from '../../auth/constants';
import { ModelRestController } from '../../core/api/model.controller';
import { Result } from '../../core/models/result';
import { PathInstanceValidation } from '../../models/validation/path-instance.z';
import { CourseInstanceService } from '../course-instance/course-instance.service';
import { CourseService } from '../course/course.service';
import { QuizInstanceService } from '../quiz-instance/quiz-instance.service';
import { createCourseInstnaceDTO, createQuizInstnaceDTO } from './path-instance';
import { PathInstanceService } from './path-instance.service';

@Controller('path-instance')
export class PathInstanceController extends ModelRestController<
  PathInstance,
  Prisma.PathInstanceFindManyArgs,
  Prisma.PathInstanceCreateInput,
  Prisma.PathInstanceUpdateInput
> {
  constructor(
    pathInstanceService: PathInstanceService,
    private courseService: CourseService,
    private courseInstanceService: CourseInstanceService,
    private quizInstanceService: QuizInstanceService,
  ) {
    super(pathInstanceService, PathInstanceValidation);
  }

  @Post()
  async create(
    @Body() pathInstanceDto: Prisma.PathInstanceCreateInput,
    @CurrentUser() user: Payload,
  ): Promise<PathInstance> {
    const pathInstance = await super.create(pathInstanceDto, user);
    const courses = await this.courseService.findAll({ where: { pathId: pathInstance.pathId } });
    this.createCourseInstances(courses, pathInstance, user);
    return pathInstance;
  }

  private async createCourseInstances(courses: Result<Course>, pathInstance: PathInstance, user: Payload) {
    for (const course of courses.items) {
      const courseInstanceDto = createCourseInstnaceDTO(course, pathInstance, user);
      const courseInstnace = await this.courseInstanceService.create(courseInstanceDto);
      await this.createQuizzes(course, courseInstnace, user);
    }
  }

  private async createQuizzes(course: Course, courseInstnace: CourseInstance, user: Payload) {
    const quizzes = course.quiz as unknown as QuizInstance[];
    for (const quiz of quizzes) {
      const quizInstanceDto = createQuizInstnaceDTO(quiz, courseInstnace, user);
      await this.quizInstanceService.create(quizInstanceDto);
    }
  }
}
