import mongoose, { Document } from "mongoose";

export interface User {
  email: string;
  password: string;
  _id?: string;
  refreshTokens?: string[];
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshTokens: {
    type: [String],
    default: [],
  },
});

export const userModel = mongoose.model<User>("Users", userSchema);
export type UserDocument = Document<unknown, {}, User> &
  User &
  Required<{
    _id: string;
  }> & {
    __v: number;
  };
