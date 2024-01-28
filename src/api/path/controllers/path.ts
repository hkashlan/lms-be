import { Context, Next } from "koa";
/**
 * path controller
 */

import { factories } from "@strapi/strapi";

const getUserId = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    ctx.throw(401, "Unauthorized");
  }

  const userId = user.id;

  return userId;
};

export default factories.createCoreController(
  "api::path.path",
  ({ strapi }) => ({
    async findUserFaculty(ctx: Context) {
      const userId = await getUserId(ctx);
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId
      );

      // const qp = await this.sanitizeParams(ctx);
      // const { results, pagination } = await strapi.service(api::restaurant.restaurant).find(qp);
      // const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return user; // this.transformResponse(sanitizedResults, { pagination });
    },
  })
);
