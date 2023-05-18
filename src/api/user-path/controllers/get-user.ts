import { User, UserRelations } from "../../../schema";

export async function getUser(userId: any, populate?: any): Promise<User> {
  return await strapi.query("plugin::users-permissions.user").findOne({
    where: { id: userId },
    populate,
  });
}

export async function getUserForPath(userId: any): Promise<User> {
  return await getUser(userId, {
    [UserRelations.paths]: "*",
    [UserRelations.pathInstances]: "*",
  });
}
