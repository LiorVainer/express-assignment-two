import { User } from "../models/user.model";

export type UserWithTokens = User & {
  accessToken?: string;
  refreshToken?: string;
};

export interface CreateUserBody {
  email: string;
  password: string;
}

export interface UpdateUserBody {
  email?: string;
  password?: string;
}
