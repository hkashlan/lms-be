import {
  PathInstanceRelations,
  User,
  PathInstanceAttributes,
  UserAttributes,
  PathInstance,
  CourseInstanceRelations,
} from "../../../../schema";
import { PathRelations } from "../../../../schema";
import { getUserForPath } from "./get-user";

export async function getAvailablePathsForStudent(
  userId: any,
  withStudents = false
) {
  const user: User = await getUserForPath(userId);
  const pathTakenIds = user.paths.map((path) => path.id);

  const populate = withStudents
    ? {
        [PathInstanceRelations.path]: {
          populate: {
            [PathRelations.students]: "*",
          },
        },
        [PathInstanceRelations.course_instances]: {
          populate: {
            [CourseInstanceRelations.course]: "*",
          },
        },
        [PathInstanceRelations.students]: "*",
      }
    : {
        [PathInstanceRelations.path]: "*",
      };

  const openPathInstances: PathInstance[] = await strapi
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

  openPathInstances.filter((path) => !pathTakenIds.includes(path.path.id));
  return { openPathInstances, user };
}
