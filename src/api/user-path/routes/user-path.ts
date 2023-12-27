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
    {
      method: "GET",
      path: "/user/open-paths",
      handler: "user-path.openPaths",
      config: {
        // https://docs.strapi.io/dev-docs/backend-customization/policies
        policies: ["global::is-authenticated"],
      },
    },
    {
      method: "GET",
      path: "/user/open-paths/register/:id",
      handler: "user-path.register",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
    {
      method: "GET",
      path: "/user/open-paths/finish-lesson/:courseId/:lessonId/:finish",
      handler: "user-path.finishLesson",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
    {
      method: "GET",
      path: "/user/open-paths/finish-exam/:courseId/:lessonId/:mark",
      handler: "user-path.finishExam",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
    {
      method: "GET",
      path: "/user/open-paths/finish-quiz/:courseId/:quizId/:fullMark/:mark",
      handler: "user-path.finishQuiz",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
    {
      method: "POST",
      path: "/user/open-paths/save-profile",
      handler: "user-path.saveProfile",
      config: {
        // https://docs.strapi.io/dev-docs/backend-customization/policies
        policies: ["global::is-authenticated"],
      },
    },
  ],
};
