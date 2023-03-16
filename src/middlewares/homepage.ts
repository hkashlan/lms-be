/**
 * `homepage` middleware
 */

import { Strapi } from "@strapi/strapi";
import koaStatic from "koa-static";

export default (config, { strapi }: { strapi: Strapi }) => {
  strapi.server.routes([
    {
      method: "GET",
      path: "/",
      handler: koaStatic(strapi.dirs.static.public + "/index.html", {
        maxage: 60000,
        defer: true,
      }),
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/index.html",
      handler: koaStatic(strapi.dirs.static.public + "/index.html", {
        maxage: 60000,
        defer: true,
      }),
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/(.*)",
      handler: koaStatic(strapi.dirs.static.public, {
        maxage: 60000,
        defer: true,
      }),
      config: { auth: false },
    },
  ]);

  return null;
};
