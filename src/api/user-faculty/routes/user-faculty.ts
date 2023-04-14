export default {
  routes: [
    {
      method: "GET",
      path: "/user/my-faculties",
      handler: "user-faculty.myFaculties",
      config: {
        // https://docs.strapi.io/dev-docs/backend-customization/policies
        policies: ["global::is-authenticated"],
      },
    },
  ],
};
