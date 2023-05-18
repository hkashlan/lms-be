import { User, PathInstance } from "../../../schema";

export async function registerStudentDB(user: User, path: PathInstance) {
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
