
import { Document, Model } from 'mongoose';

export type Token = {
    token: string;
};

export type DecodedToken = {
    _id: string;
    iat: number;
};

export interface IUser {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    tokens: Token[];
}

export type CreateUserInput = Pick<
    IUser,
    'email' | 'password' | 'firstName' | 'lastName'
>;

export type PublicUserInfo = Pick<IUser, 'email' | 'firstName' | 'lastName'> & {
    _id: string;
};

export interface IUserMethods {
    toPublicJSON(): PublicUserInfo;
    generateAuthToken(): Promise<string>;
}

export type UserModel = IUser & IUserMethods & Document;

export interface IUserModel extends Model<IUser, Record<string, never>, IUserMethods> {
    createUser(user: CreateUserInput): Promise<PublicUserInfo>;
    findByCredentials(email: string, password: string): Promise<UserModel>;
    findUserByToken(token: string): Promise<UserModel>;
}