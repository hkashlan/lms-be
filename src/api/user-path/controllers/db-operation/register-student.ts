import { User, PathInstance } from "../../../../schema";

export async function registerStudentDB(user: User, path: PathInstance) {
  user.pathInstances.push({ path: path.path, path_instance: path });
  user.paths.push(path.path);
  path.path.students.push(user);
  path.students.push(user);
  path.numberOfRegisteredStudents++;
  user.courses = user.courses ?? [];
  user.courses.push(
    ...path.course_instances.map(
      (c) =>
        ({
          course: c.course.id,
          course_instance: c.id,
          path: path.path.id,
        } as any)
    )
  );

  await strapi.entityService.update("plugin::users-permissions.user", user.id, {
    data: {
      paths: user.paths,
      courses: user.courses,
      pathInstances: user.pathInstances,
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
