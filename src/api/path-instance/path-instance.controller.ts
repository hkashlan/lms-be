import { Body, Controller, Post } from '@nestjs/common';
import { Course, PathInstance, Prisma, Role } from '@prisma/client';
import { Payload } from '../../auth/auth.service';
import { CurrentUser, Public } from '../../auth/constants';
import { ModelRestController } from '../../core/api/model.controller';
import { Result } from '../../core/models/result';
import { PathInstanceValidation } from '../../models/validation/path-instance.z';
import { CourseInstanceService } from '../course-instance/course-instance.service';
import { CourseService } from '../course/course.service';
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
  ) {
    super(pathInstanceService, PathInstanceValidation);
  }

  @Public()
  @Post()
  async create(
    @Body() createUserDto: Prisma.PathInstanceCreateInput,
    @CurrentUser() user: Payload,
  ): Promise<PathInstance> {
    // createUserDto ={
    //   name: 'test',
    //   description: 'test',
    //   // pathId: 1,

    // };
    user = {
      sub: 1,
      username: 'test',
      name: 'test',
      roles: [Role.TEACHER],
    };
    const pathInstance = await super.create(createUserDto, user);
    const courses = await this.courseService.findAll({
      where: { pathId: pathInstance.pathId },
    });
    this.createCourseInstances(courses, user);
    return pathInstance;
  }

  private createCourseInstances(courses: Result<Course>, user: Payload) {
    courses.items.forEach((course) => {
      const courseInstance: Prisma.CourseInstanceCreateInput = {
        ...course,
      } as unknown as Prisma.CourseInstanceCreateInput;
      ModelRestController.fillUserInfo(courseInstance, user);
      this.courseInstanceService.create(courseInstance);
    });
  }
}
