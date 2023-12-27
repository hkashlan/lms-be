import {
  StudentLesson,
  CourseInstance,
  CourseInstanceRelations,
  LessonRelations,
  StudentLessonRelations,
  StudentQuizRelations,
  StudentQuiz,
  QuizRelations,
} from "../../../../schema";

export async function updateStudentQuiz(
  courseId: number,
  quizId: number,
  user: any,
  fullMark: number,
  mark: number
): Promise<StudentLesson> {
  const courseInstance: CourseInstance = await strapi
    .query("api::course-instance.course-instance")
    .findOne({
      where: { id: courseId },
      populate: {
        [CourseInstanceRelations.quizzes]: {
          populate: {
            [QuizRelations.student_quizzes]: {
              populate: {
                [StudentQuizRelations.student]: {
                  populate: true,
                },
              },
            },
          },
        },
      },
    });

  const quiz = courseInstance.quizzes[quizId];

  let userActivity: StudentQuiz = quiz.student_quizzes.find(
    (s) => s.student.id === user.id
  );
  if (!userActivity) {
    userActivity = {
      student: user,
      date: new Date(),
      mark,
      fullMark,
    };
    quiz.student_quizzes.push(userActivity);
  } else {
    userActivity.mark = mark;
  }

  await strapi.entityService.update(
    "api::course-instance.course-instance",
    courseId,
    {
      data: {
        quizzes: courseInstance.quizzes,
      },
    }
  );
  return userActivity;
}
