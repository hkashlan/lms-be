export default {
  routes: [
    {
      method: "GET",
      path: "/user/my-paths",
      handler: "user-path.myPaths",
      config: {
        // https://docs.strapi.io/dev-docs/backend-customization/policies
        policies: ["global::is-authenticated"],
      },
    },
  ],
};
