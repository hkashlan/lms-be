import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CourseInstance, PathInstance, Prisma, QuizInstance, Role, Student, StudentPathInstance } from '@prisma/client';
import { Payload } from '../../auth/auth.service';
import { CurrentUser, Public } from '../../auth/constants';
import { ModelRestController } from '../../core/api/model.controller';
import { StudentValidation } from '../../models/validation/student.z';
import { StudentService } from './student.service';

export interface FinishStudentLesson {
  done?: boolean;
  fullMark?: number;
  mark?: number;
  answeredOptions?: number[][];
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

  @Public()
  @Get('my-paths')
  async getMyPaths(@CurrentUser() user: Payload): Promise<Student> {
    user = this.fakeUser(user);
    const retVal = await this.studentService.fetchStudentCourses(user);
    // console.log('retVal', JSON.stringify(retVal, null, 2));
    return retVal;
  }

  @Public()
  @Get('open-paths')
  async getOpenPaths(@CurrentUser() user: Payload): Promise<PathInstance[]> {
    user = this.fakeUser(user);
    const today = new Date();
    const openPaths = await this.studentService.fetchOpenPath(user, today);
    return openPaths;
  }

  @Public()
  @Post('finish-exam')
  async finishExam(@Body() createUserDto: FinishStudentQuiz, @CurrentUser() user: Payload): Promise<QuizInstance> {
    user = this.fakeUser(user);
    console.log('user', user);
    console.log('createUserDto', createUserDto);
    const finishexam = await this.studentService.finishExams(user, createUserDto);
    return finishexam;
  }

  @Public()
  @Post('finish-lesson')
  async finishLesson(
    @Body() createUserDto: FinishStudentLesson,
    @CurrentUser() user: Payload,
  ): Promise<CourseInstance> {
    user = this.fakeUser(user);
    console.log('user', user);
    console.log('createUserDto', createUserDto);
    const finishlesson = await this.studentService.finishLesson(user, createUserDto);
    return finishlesson;
  }

  @Public()
  @Get('register/:pathInstanceId')
  async register(
    @Param('pathInstanceId', ParseIntPipe) pathInstanceId: number,
    @CurrentUser() user: Payload,
  ): Promise<StudentPathInstance> {
    user = this.fakeUser(user);
    // console.log('user', user);
    const createdPathInstance = await this.studentService.registerStudent(user, pathInstanceId);
    return createdPathInstance;
  }

  private fakeUser(user: Payload) {
    user = {
      sub: 1,
      username: 'test',
      name: 'test',
      roles: [Role.STUDENT],
    };
    return user;
  }
}
