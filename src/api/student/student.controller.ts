import { Body, Controller, Get, Post } from '@nestjs/common';
import { Course, CourseInstance, PathInstance, Prisma, QuizInstance, Role, Student } from '@prisma/client';
import { of } from 'rxjs';
import { Payload } from '../../auth/auth.service';
import { CurrentUser, Public } from '../../auth/constants';
import { ModelRestController } from '../../core/api/model.controller';
import { StudentValidation } from '../../models/validation/student.z';
import { CourseInstanceService } from '../course-instance/course-instance.service';
import { StudentService } from './student.service';

export interface StudentInfo {
  courses: CourseInstance[];
  quizzes: QuizInstance[];
  pathes: PathInstance[];
}

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
  constructor(
    studentService: StudentService,
    private courseInstanceService: CourseInstanceService,
  ) {
    super(studentService, StudentValidation);
  }

  @Public()
  @Get('my-paths')
  async getMyPaths(@CurrentUser() user: Payload) {
    const studentInfo: StudentInfo = {
      courses: [],
      quizzes: [],
      pathes: [],
    };

    const student = await this.apiService.findOne(user.sub);

    if (student) {
      const courseInstances = await this.courseInstanceService.findAll({
        where: {
          pathInstance: {
            studentPathInstance: {
              some: { student: { id: student.id } },
            },
          },
        },
      });
      console.log(courseInstances);
    }

    return of<StudentInfo>(studentInfo);
  }

  @Public()
  @Get('open-paths')
  async getOpenPaths(@CurrentUser() user: Payload) {
    user = this.fakeUser(user);
    console.log('user', user);
    return of<PathInstance[]>([]);
  }

  @Public()
  @Post('finish-exam')
  async finishExam(@Body() createUserDto: FinishStudentQuiz, @CurrentUser() user: Payload) {
    user = this.fakeUser(user);
    console.log('user', user);
    console.log('createUserDto', createUserDto);
    return of<QuizInstance>({} as QuizInstance);
  }

  @Public()
  @Post('finish-lesson')
  async finishLesson(@Body() createUserDto: FinishStudentLesson, @CurrentUser() user: Payload) {
    user = this.fakeUser(user);
    console.log('user', user);
    console.log('createUserDto', createUserDto);
    return of<Course>({} as Course);
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
