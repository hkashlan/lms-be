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
import { PathRelations } from "../../../schema";

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
    const response: BFF.Response<BFF.myPaths.Student> = {};
    try {
      const userId = await getUserId(ctx);
      const user = await getUser(userId, getUserPopulate().populate);

      const student: BFF.myPaths.Student = mapUserToStudent(user);

      response.data = student;

      ctx.body = response;
    } catch (err) {
      console.error(err);
      ctx.body = err;
    }
  },

  openPaths: async (ctx: Context, next: Next) => {
    const response: BFF.Response<PathInstance[]> = {};
    try {
      // const user: User = await strapi.services[
      //   "plugin::content-manager.entity-manager"
      // ].findOne(1, "plugin::users-permissions.user");
      const userId = await getUserId(ctx);
      const { openPaths } = await getAvailablePathsForStudent(userId);
      response.data = openPaths;

      ctx.body = response;
    } catch (err) {
      console.error(err);
      ctx.body = err;
    }
  },
  register: async (ctx: Context, next: Next) => {
    const response: BFF.Response<BFF.openPath.PathInstance[]> = {};

    const id = +ctx.params.id;
    const userId = await getUserId(ctx);
    const { openPaths, user } = await getAvailablePathsForStudent(userId, true);
    const path = openPaths.find((p) => p.path.id === id);

    if (path && path.numberOfRegisteredStudents < path.numberOfStudents) {
      await registerStudentDB(user, path);
      response.data = openPaths.filter((p) => p !== path);
    } else if (!path) {
      response.error = { message: BFF.register.Errors.PATH_NOT_FOUND };
    }
    ctx.body = response;
  },

  saveProfile: async (ctx: Context, next: Next) => {
    const response: BFF.saveProfile.response = {};
    const user = ctx.state.user;

    const { firstName, lastName } = ctx.request.body;
    await strapi.query("plugin::users-permissions.user").update({
      where: { id: user.id },
      data: {
        firstName,
        lastName,
      },
    });

    response.data = {
      firstName,
      lastName,
    };
    ctx.body = response;
  },
};

async function registerStudentDB(user: User, path: PathInstance) {
  user.pathInstances.push({ path: path.path, path_instance: path });
  user.paths.push(path.path);
  path.path.students.push(user);
  path.students.push(user);
  path.numberOfRegisteredStudents++;

  await strapi.query("plugin::users-permissions.user").update({
    where: { id: user.id },
    data: {
      paths: user.paths,
    },
  });

  await strapi.query("api::path-instance.path-instance").update({
    where: { id: path.id },
    data: {
      students: path.students,
      numberOfRegisteredStudents: path.numberOfRegisteredStudents,
    },
  });

  await strapi.query("api::path.path").update({
    where: { id: path.id },
    data: {
      students: path.path.students,
    },
  });
}

async function getUser(userId: any, populate?: any): Promise<User> {
  return await strapi.query("plugin::users-permissions.user").findOne({
    where: { id: userId },
    populate,
  });
}

async function getUserForPath(userId: any): Promise<User> {
  return await getUser(userId, {
    [UserRelations.paths]: "*",
    [UserRelations.pathInstances]: "*",
  });
}

async function getAvailablePathsForStudent(userId: any, withStudents = false) {
  const user: User = await getUserForPath(userId);
  const pathTakenIds = user.paths.map((path) => path.id);

  const populate = withStudents
    ? {
        [PathInstanceRelations.path]: {
          populate: {
            [PathRelations.students]: "*",
          },
        },
        [PathInstanceRelations.students]: "*",
      }
    : {
        [PathInstanceRelations.path]: "*",
      };

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
      populate,
    });

  openPaths.filter((path) => !pathTakenIds.includes(path.path.id));
  return { openPaths, user };
}

function mapUserToStudent(user: User): BFF.myPaths.Student {
  const student: BFF.myPaths.Student = {
    title: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
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
