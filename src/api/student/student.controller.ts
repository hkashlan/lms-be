import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  CourseInstance,
  PathInstance,
  Prisma,
  QuizInstanceStudent,
  Role,
  Student,
  StudentPathInstance,
} from '@prisma/client';
import { Payload } from '../../auth/auth.service';
import { CurrentUser, Roles } from '../../auth/constants';
import { ModelRestController } from '../../core/api/model.controller';
import { StudentLesson } from '../../models/schema';
import { StudentValidation } from '../../models/validation/student.z';
import { StudentService } from './student.service';

export class FinishStudentLesson {
  studentLesson: StudentLesson;
  courseId: number;
  lessonId: number;
}

export interface FinishStudentQuiz {
  fullMark: number;
  mark: number;
  answeredOptions: number[][];
  quizzId: number;
}

@Controller('student')
export class StudentController extends ModelRestController<
  Student,
  Prisma.StudentFindManyArgs,
  Prisma.StudentCreateInput,
  Prisma.StudentUpdateInput
> {
  constructor(private studentService: StudentService) {
    super(studentService, StudentValidation);
  }

  @Roles(Role.STUDENT)
  @Get('my-paths')
  async getMyPaths(@CurrentUser() user: Payload): Promise<Student> {
    return await this.studentService.fetchStudentCourses(user);
  }

  @Roles(Role.STUDENT)
  @Get('open-paths')
  async getOpenPaths(@CurrentUser() user: Payload): Promise<PathInstance[]> {
    const today = new Date();
    return await this.studentService.fetchOpenPath(user, today);
  }

  @Roles(Role.STUDENT)
  @Post('finish-exam')
  async finishExam(
    @Body() quizInstanceStudent: QuizInstanceStudent,
    @CurrentUser() user: Payload,
  ): Promise<QuizInstanceStudent> {
    return await this.studentService.finishExam(user, quizInstanceStudent);
  }

  @Roles(Role.STUDENT)
  @Post('finish-lesson')
  async finishLesson(
    @Body() createUserDto: FinishStudentLesson,
    @CurrentUser() user: Payload,
  ): Promise<CourseInstance> {
    return await this.studentService.updateLessonStudent(user, createUserDto);
  }

  @Roles(Role.STUDENT)
  @Get('register/:pathInstanceId')
  async register(
    @Param('pathInstanceId', ParseIntPipe) pathInstanceId: number,
    @CurrentUser() user: Payload,
  ): Promise<StudentPathInstance> {
    return await this.studentService.registerStudent(user, pathInstanceId);
  }
}
