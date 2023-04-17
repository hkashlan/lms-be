/**
 * A set of functions called "actions" for `user-path`
 */

import {
  CourseRelations,
  CourseInstance,
  CourseInstanceRelations,
  CourseResultRelations,
  Lesson,
  LessonRelations,
  PathInstanceRelations,
  PathResultRelations,
  QuestionRelations,
  Quiz,
  QuizRelations,
  StudentLessonRelations,
  StudentQuizRelations,
  User,
  UserRelations,
  PathInstanceAttributes,
  UserAttributes,
  PathInstance,
} from "../../../schema";

const getUserId = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    ctx.throw(401, "Unauthorized");
  }

  const userId = user.id;

  return userId;
};
// BFF.myPaths.Student
import { Context, Next } from "koa";
import { BFF } from "../../../schema-bff";

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
          [StudentLessonRelations.student]: "*",
        },
      },
    },
  };
}

function getQuizzes() {
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

function getUserPopulate() {
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
            },
          },
          [CourseResultRelations.path]: "*",
        },
      },
    },
  };
  return user;
}

export default {
  myPaths: async (ctx: Context, next: Next) => {
    try {
      const userId = await getUserId(ctx);
      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: userId },
          ...getUserPopulate(),
        });

      const student: BFF.myPaths.Student = mapUserToStudent(user);

      ctx.body = student;
    } catch (err) {
      console.error(err);
      ctx.body = err;
    }
  },

  openPaths: async (ctx: Context, next: Next) => {
    try {
      // const user: User = await strapi.services[
      //   "plugin::content-manager.entity-manager"
      // ].findOne(1, "plugin::users-permissions.user");
      const userId = await getUserId(ctx);
      const user: User = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: userId },
          populate: {
            [UserRelations.paths]: "*",
          },
        });
      const pathTakenIds = user.paths.map((path) => path.id);

      const openPaths: PathInstance[] = await strapi
        .query("api::path-instance.path-instance")
        .findMany({
          where: {
            [PathInstanceAttributes.stillOpen]: true,
            [PathInstanceAttributes.students]: {
              $or: [
                {
                  [UserAttributes.id]: { $ne: userId },
                },
                {
                  [UserAttributes.id]: { $null: true },
                },
              ],
            },
          },
          populate: {
            [PathInstanceRelations.path]: "*",
          },
        });

      openPaths.filter((path) => !pathTakenIds.includes(path.path.id));
      ctx.body = openPaths;
    } catch (err) {
      console.error(err);
      ctx.body = err;
    }
  },
};

function mapUserToStudent(user: User): BFF.myPaths.Student {
  const student: BFF.myPaths.Student = {
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
            pathId: f.path.id,
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
        } as BFF.myPaths.Path)
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
