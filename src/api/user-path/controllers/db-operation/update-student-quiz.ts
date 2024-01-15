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
import { BFF } from "../../../../schema-bff";

export async function updateStudentQuiz(
  user: any,
  studentQuiz: BFF.StudentQuizBody
): Promise<StudentLesson> {
  const courseInstance: CourseInstance = await strapi
    .query("api::course-instance.course-instance")
    .findOne({
      where: { id: studentQuiz.courseId },
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

  const quiz = courseInstance.quizzes[studentQuiz.quizId];

  let userActivity: StudentQuiz = quiz.student_quizzes.find(
    (s) => s.student.id === user.id
  );
  if (!userActivity) {
    userActivity = {
      student: user,
      date: new Date(),
      mark: studentQuiz.mark,
      fullMark: studentQuiz.fullMark,
      answeredOptions: studentQuiz.answeredOptions,
    };
    quiz.student_quizzes.push(userActivity);
  } else {
    userActivity.mark = studentQuiz.mark;
    userActivity.answeredOptions = studentQuiz.answeredOptions;
  }

  await strapi.entityService.update(
    "api::course-instance.course-instance",
    studentQuiz.courseId,
    {
      data: {
        quizzes: courseInstance.quizzes,
      },
    }
  );
  return userActivity;
}
