import { Course, CourseInstance, PathInstance, Prisma } from '@prisma/client';
import { Payload } from '../../auth/auth.service';
import { ModelRestController } from '../../core/api/model.controller';

export function createCourseInstnaceDTO(
  course: Course,
  pathInstance: PathInstance,
  user: Payload,
): Prisma.CourseInstanceCreateInput {
  const retVal: Omit<CourseInstance, 'id'> = {
    name: course.name,
    description: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    book: '',
    lessons: course.lessons!,
    pageFrom: 0,
    pageTo: 0,
    courseId: course.id,
    courseName: course.name,
    pathInstanceId: pathInstance.id,
    pathInstanceName: pathInstance.name,
    teacherId: user.sub,
    teacherName: user.name,
    ...ModelRestController.fillUserInfo(user),
  };
  return retVal as unknown as Prisma.CourseInstanceCreateInput;
}
