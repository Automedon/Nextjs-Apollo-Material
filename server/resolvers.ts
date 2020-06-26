import { IResolvers } from "graphql-tools";
import { GraphQLEmailAddress } from "graphql-scalars";
import UserModel from "./models/User";

export const resolvers: IResolvers = {
  Email: GraphQLEmailAddress,
  Query: {
    user: async (_, { id }) => {
      return UserModel.findById(id);
    },
    users: async (_, { skip, limit }) => {
      return UserModel.find().skip(skip).limit(limit);
    },
  },
  Mutation: {
    createUser: async (_, { input: { email, name } }) => {
      return await new UserModel({ email, name }).save();
    },
    updateUser: async (_, { id, input: { email, name } }) => {
      return UserModel.findByIdAndUpdate({ _id: id }, { email, name });
    },
    deleteUser: async (_, { id }) => {
      return UserModel.findByIdAndDelete(id);
    },
  },
};
