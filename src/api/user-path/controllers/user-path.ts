/**
 * A set of functions called "actions" for `user-path`
 */

import { PathInstance } from "../../../schema";

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
import { mapUserToStudent } from "./utils/mapUserToStudent";
import { getAvailablePathsForStudent } from "./utils/getAvailablePathsForStudent";
import { getUser } from "./utils/get-user";
import { getUserPopulate } from "./utils/getUserPopulate";
import { registerStudentDB } from "./db-operation/register-student";
import { updateStudentLesson } from "./db-operation/update-student-lesson";

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
  finishExam: async (ctx: Context, next: Next) => {
    const response: BFF.studentLessonResponse.response = {};

    let userActivity = await updateStudentLesson(
      +ctx.params.courseId,
      +ctx.params.lessonId,
      ctx.state.user,
      { mark: +ctx.params.mark }
    );
    response.data = userActivity;
    ctx.body = response;
  },

  finishLesson: async (ctx: Context, next: Next) => {
    const response: BFF.studentLessonResponse.response = {};
    const finish = ctx.params.finish === "true";

    let userActivity = await updateStudentLesson(
      +ctx.params.courseId,
      +ctx.params.lessonId,
      ctx.state.user,
      { done: finish }
    );
    response.data = userActivity;
    ctx.body = response;
  },
};
