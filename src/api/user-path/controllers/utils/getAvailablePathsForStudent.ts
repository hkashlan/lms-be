import { Attribute } from "@strapi/strapi";
import {
  PathInstanceRelations,
  User,
  PathInstanceAttributes,
  UserAttributes,
  PathInstance,
  CourseInstanceRelations,
  PathAttributes,
  pathInstanceRelations,
} from "../../../../schema";
import { PathRelations } from "../../../../schema";
import { getUserForPath } from "./get-user";

export async function getAvailablePathsForStudent(
  userId: any,
  withStudents = false
) {
  const user: User = await getUserForPath(userId);
  const pathTakenIds = user.paths.map((path) => path.id);

  // const PATH_INSTANCE_PATH: "path" = pathInstanceRelations.path;
  const populate = withStudents
    ? {
        path: {
          populate: {
            students: true,
          },
        },
        course_instances: {
          populate: {
            course: true,
          },
        },
        students: true,
      }
    : {
        // [PathInstanceRelations.path]: "*",
        path: true,
      };

  let openPathInstances = await strapi.entityService.findMany(
    "api::path-instance.path-instance",
    {
      where: {
        [PathInstanceAttributes.path]: {
          [PathAttributes.id]: {},
        },
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
    }
  );

  openPathInstances = openPathInstances.filter(
    (path) => !pathTakenIds.includes(path.path.id as number)
  );
  return { openPathInstances, user };
}
