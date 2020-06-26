const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const env = {
    ENDPOINT: isDev
      ? "http://localhost:3000/api/graphql"
      : "https://nextjs-apollo-material.vercel.app",
  };
  return {
    env,
  };
};
