/**
 * A set of functions called "actions" for `user-path`
 */

import {
  CourseAttributes,
  CourseInstance,
  CourseInstanceAttributes,
  CourseResultAttributes,
  Lesson,
  LessonAttributes,
  PathResultAttributes,
  QuestionAttributes,
  Quiz,
  QuizAttributes,
  StudentLessonAttributes,
  StudentQuizAttributes,
  User,
  UserAttributes,
} from "../../../schema";

const getUserId = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    ctx.throw(401, "Unauthorized");
  }

  const userId = user.id;

  return userId;
};
// BFF.Student
import { Context, Next } from "koa";
import { BFF } from "../../../schema-bff";

function getQuestions() {
  return {
    [LessonAttributes.questions]: {
      populate: {
        [QuestionAttributes.answers]: "*",
      },
    },
  };
}

function getLessonPopulate() {
  return {
    [CourseInstanceAttributes.lessons]: {
      populate: {
        ...getQuestions(),
        [LessonAttributes.student_activities]: {
          [StudentLessonAttributes.student]: "*",
        },
      },
    },
  };
}

function getQuizzes() {
  return {
    [CourseInstanceAttributes.quizzes]: {
      populate: {
        ...getQuestions(),
        [QuizAttributes.student_quizzes]: {
          populate: {
            [StudentQuizAttributes.student]: "*",
          },
        },
      },
    },
  };
}

function getUserPopulate() {
  const user = {
    populate: {
      [UserAttributes.paths]: "*",
      [UserAttributes.pathInstances]: {
        populate: {
          [PathResultAttributes.path]: "*",
          [PathResultAttributes.path_instance]: "*",
        },
      },
      [UserAttributes.courses]: {
        populate: {
          [CourseResultAttributes.course_instance]: {
            populate: {
              ...getLessonPopulate(),
              ...getQuizzes(),
            },
          },
          [CourseResultAttributes.path]: "*",
        },
      },
    },
  };
  return user;
}

export default {
  myPaths: async (ctx: Context, next: Next) => {
    try {
      // const user: User = await strapi.services[
      //   "plugin::content-manager.entity-manager"
      // ].findOne(1, "plugin::users-permissions.user");
      const userId = await getUserId(ctx);
      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: userId },
          ...getUserPopulate(),
        });
      const student: BFF.Student = mapUserToStudent(user);
      // const userId = await getUserId(ctx);
      // const tt = getDeepPopulate("plugin::users-permissions.user");
      // const user = await strapi.entityService.findOne(
      //   "plugin::users-permissions.user",
      //   1
      // {
      //   where: { id: 1 },
      //   populate: {
      //     [UserAttributes.paths]: "*",
      //     [UserAttributes.courses]: {
      //       populate: {
      //         [CourseAttributes.course_instances]: "*",
      //       },
      //     },
      //   },
      // }
      // );
      // const user = await strapi.query["plugin::users-permissions.user"]
      //   .findOne({ id: 1 })
      //   .populateDeep();

      ctx.body = student;
    } catch (err) {
      console.error(err);
      ctx.body = err;
    }
  },
};

function mapUserToStudent(user: User): BFF.Student {
  const student: BFF.Student = {
    title: user.username,
    lastTitle: "",
    image: "",
    paths: user.pathInstances.map(
      (f) =>
        ({
          id: f.path.id,
          title: f.path.title,
          description: f.path.description,
          progress: arrPercentage(
            user.courses,
            (c) => c.path.id === f.path.id && !!c.mark
          ),
          courses: user.courses.map((c) => ({
            id: c.course_instance.id,
            facultyId: f.path.id,
            title: c.course_instance.title,
            description: c.course_instance.description,
            dateFrom: c.course_instance.dateFrom,
            dateTo: c.course_instance.dateTo,
            progress: arrPercentage(c.course_instance.lessons, (l) =>
              l.student_activities.some(
                (s) => s.student.id === user.id && s.done
              )
            ),
            lessons: mapLessonsToBffLessons(c.course_instance.lessons, user.id),
            quizzes: mapQuizzesToBffQuizzes(c.course_instance.quizzes, user.id),
          })),
        } as BFF.Faculty)
    ),
  };
  return student;
}

function arrPercentage<T>(arr: T[], predicate: (value: T) => boolean) {
  return arr?.filter(predicate).length * 100 || 0 / arr?.length || 1;
}
function mapLessonsToBffLessons(
  lessons: Lesson[],
  userId: number
): BFF.Lesson[] {
  return lessons?.map((l, index) => {
    const studentLesson = l.student_activities.find(
      (s) => s.student.id === userId
    ) ?? { done: false, mark: undefined };
    return {
      lessonId: index,
      title: l.title,
      description: l.description,
      present: studentLesson.done,
      done: studentLesson.done,
      date: l.date,
      mark: studentLesson.mark,
      questions: l.questions,
    };
  });
}

function mapQuizzesToBffQuizzes(quizzes: Quiz[], id: number): BFF.Quiz[] {
  return quizzes?.map((q) => {
    const quizStudent = q.student_quizzes.find((s) => s.student.id === id);
    return {
      dateFrom: q.dateFrom,
      dateTo: q.dateTo,
      doneOnDate: quizStudent?.date,
      title: q.title,
      questions: q.questions,
      mark: quizStudent?.mark,
    };
  });
}
