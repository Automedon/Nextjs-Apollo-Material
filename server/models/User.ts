import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  name: string;
}

const UserSchema: Schema = new mongoose.Schema({
  email: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
});

let model: Model<IUser>;

try {
  model = mongoose.model<IUser>("UserModel", UserSchema);
} catch {
  model = mongoose.model<IUser>("UserModel");
}

export default model;
