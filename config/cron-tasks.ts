import { PathInstanceAttributes } from "../src/schema";

export default {
  /**
   * Simple example.
   * Every day at 1am.
   */

  "0 0 1 * * *": async ({ strapi }) => {
    // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
    // close all open paths after date
    await closeOpenPaths(strapi);
    await openOpenPaths(strapi);
  },
};

function closeOpenPaths(strapi: any) {
  strapi.query("api::path-instance.path-instance").updateMany({
    where: {
      [PathInstanceAttributes.stillOpen]: true,
      [PathInstanceAttributes.dateTo]: { $gt: startOfDay() },
    },
    data: {
      [PathInstanceAttributes.stillOpen]: false,
    },
  });
}

function openOpenPaths(strapi: any) {
  strapi.query("api::path-instance.path-instance").updateMany({
    where: {
      [PathInstanceAttributes.stillOpen]: false,
      [PathInstanceAttributes.dateFrom]: { $gt: startOfDay() },
    },
    data: {
      [PathInstanceAttributes.stillOpen]: true,
    },
  });
}

function startOfDay() {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0
  );
  return startOfDay.toISOString();
}
