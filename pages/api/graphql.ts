import micro_cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";

import { typeDefs } from "../../server/typeDefs";
import { resolvers } from "../../server/resolvers";
import { connectToDatabase } from "../../mongoDB";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }: any) => {
    await connectToDatabase(
      process.env.MONGO_URL || "mongodb://localhost:27017"
    );
    return { req, res };
  },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });
export const config = {
  api: {
    bodyParser: false,
  },
};
const cors = micro_cors({
  origin: "http://localhost:3000",
  allowCredentials: true,
});
export default cors((req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }
  return handler(req, res);
});
