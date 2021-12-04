module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"], // array of glob patterns
    tagName: "gql",
    service: {
      name: "nuber-eats-backend",
      url: "http://localhost:5000/graphql",
    },
  },
};
