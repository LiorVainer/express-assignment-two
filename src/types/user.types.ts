import {User} from "../models/user.model";

export type UserWithTokens = User & {
    accessToken?: string,
    refreshToken?: string
};