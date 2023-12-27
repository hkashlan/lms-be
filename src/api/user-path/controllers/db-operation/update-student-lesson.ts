import {
  StudentLesson,
  CourseInstance,
  CourseInstanceRelations,
  LessonRelations,
  StudentLessonRelations,
} from "../../../../schema";

export async function updateStudentLesson(
  courseId: number,
  lessonId: number,
  user: any,
  studentLesson: Partial<StudentLesson>
): Promise<StudentLesson> {
  const courseInstance: CourseInstance = await strapi
    .query("api::course-instance.course-instance")
    .findOne({
      where: { id: courseId },
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

  const lesson = courseInstance.lessons[lessonId];

  let userActivity: StudentLesson = lesson.student_activities.find(
    (s) => s.student.id === user.id
  );
  if (!userActivity) {
    userActivity = {
      student: user,
      ...studentLesson,
    };
    lesson.student_activities.push(userActivity);
  } else {
    Object.assign(userActivity, studentLesson);
  }

  await strapi.entityService.update(
    "api::course-instance.course-instance",
    courseId,
    {
      data: {
        lessons: courseInstance.lessons,
      },
    }
  );
  return userActivity;
}
