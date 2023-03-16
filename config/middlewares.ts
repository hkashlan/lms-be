export default [
  "strapi::errors",
  "strapi::security",
  "strapi::poweredBy",
  "strapi::cors",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  {
    name: "strapi::public",
    config: {
      defaultIndex: false,
    },
  },
  "global::homepage",
];
