import {
  CourseInstanceRelations,
  CourseResultRelations,
  LessonRelations,
  PathResultRelations,
  QuestionRelations,
  QuizRelations,
  StudentLessonRelations,
  StudentQuizRelations,
  UserRelations,
} from "../../../schema";

function getQuestions() {
  return {
    [LessonRelations.questions]: {
      populate: {
        [QuestionRelations.answers]: "*",
      },
    },
  };
}

function getLessonPopulate() {
  return {
    [CourseInstanceRelations.lessons]: {
      populate: {
        ...getQuestions(),
        [LessonRelations.student_activities]: {
          populate: {
            [StudentLessonRelations.student]: "*",
          },
        },
      },
    },
  };
}

export function getQuizzes() {
  return {
    [CourseInstanceRelations.quizzes]: {
      populate: {
        ...getQuestions(),
        [QuizRelations.student_quizzes]: {
          populate: {
            [StudentQuizRelations.student]: "*",
          },
        },
      },
    },
  };
}

export function getUserPopulate() {
  const user = {
    populate: {
      [UserRelations.paths]: "*",
      [UserRelations.pathInstances]: {
        populate: {
          [PathResultRelations.path]: "*",
          [PathResultRelations.path_instance]: "*",
        },
      },
      [UserRelations.courses]: {
        populate: {
          [CourseResultRelations.course_instance]: {
            populate: {
              ...getLessonPopulate(),
              ...getQuizzes(),
              [CourseInstanceRelations.book]: "*",
            },
          },
          [CourseResultRelations.path]: "*",
        },
      },
    },
  };
  return user;
}
