/**
 * A set of functions called "actions" for `user-faculty`
 */

import { CourseAttributes, UserAttributes } from "../../../schema";

const getUserId = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    ctx.throw(401, "Unauthorized");
  }

  const userId = user.id;

  return userId;
};

export default {
  myFaculties: async (ctx, next) => {
    try {
      const user = await strapi.services[
        "plugin::content-manager.entity-manager"
      ].findOne(1, "plugin::users-permissions.user");
      // const userId = await getUserId(ctx);
      // const tt = getDeepPopulate("plugin::users-permissions.user");
      // const user = await strapi.entityService.findOne(
      //   "plugin::users-permissions.user",
      //   1
      // {
      //   where: { id: 1 },
      //   populate: {
      //     [UserAttributes.faculties]: "*",
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

      ctx.body = user;
    } catch (err) {
      ctx.body = err;
    }
  },
};
