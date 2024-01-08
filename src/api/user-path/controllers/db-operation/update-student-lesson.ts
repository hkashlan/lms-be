import {
  StudentLesson,
  CourseInstance,
  CourseInstanceRelations,
  LessonRelations,
  StudentLessonRelations,
} from "../../../../schema";
import { BFF } from "../../../../schema-bff";

export async function updateStudentLesson(
  user: any,
  student: BFF.StudentLessonBody
): Promise<StudentLesson> {
  const courseInstance: CourseInstance = await strapi
    .query("api::course-instance.course-instance")
    .findOne({
      where: { id: student.courseId },
      populate: {
        [CourseInstanceRelations.lessons]: {
          populate: {
            [LessonRelations.student_activities]: {
              populate: {
                [StudentLessonRelations.student]: true,
              },
            },
          },
        },
      },
    });

  const lesson = courseInstance.lessons[student.lessonId];

  let userActivity: StudentLesson = lesson.student_activities.find(
    (s) => s.student.id === user.id
  );
  if (!userActivity) {
    userActivity = {
      student: user,
      ...student,
    };
    lesson.student_activities.push(userActivity);
  } else {
    Object.assign(userActivity, student);
  }

  await strapi.entityService.update(
    "api::course-instance.course-instance",
    student.courseId,
    {
      data: {
        lessons: courseInstance.lessons,
      },
    }
  );
  return userActivity;
}
