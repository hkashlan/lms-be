/**
 * A set of functions called "actions" for `user-path`
 */

import {
  CourseInstance,
  CourseInstanceRelations,
  LessonRelations,
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
import { mapUserToStudent } from "./mapUserToStudent";
import { getAvailablePathsForStudent } from "./getAvailablePathsForStudent";
import { getUser } from "./get-user";
import { getUserPopulate } from "./getUserPopulate";
import { registerStudentDB } from "./registerStudentDB";
import { StudentLesson } from "../../../schema";
import { StudentLessonRelations } from "../../../schema";

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

  finishLesson: async (ctx: Context, next: Next) => {
    const user = ctx.state.user;
    const response: BFF.finishLesson.response = {};
    const courseId = +ctx.params.courseId;
    const lessonId = +ctx.params.lessonId;
    const finish = ctx.params.finish === "true";

    const courseInstance: CourseInstance = await strapi
      .query("api::course-instance.course-instance")
      .findOne({
        where: { id: courseId },
        populate: {
          [CourseInstanceRelations.lessons]: {
            populate: {
              [LessonRelations.student_activities]: {
                populate: {
                  [StudentLessonRelations.student]: "*",
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
        done: finish,
        mark: 0,
      };
      lesson.student_activities.push(userActivity);
    } else {
      userActivity.done = finish;
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
    ctx.body = response;
  },
};
