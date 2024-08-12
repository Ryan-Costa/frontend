import { ReactNode } from "react";

export interface IUser {
    email?: string;
    access_token?: string;
}

export interface ICurrentUser {
    email: string;
    name: string;
}


export interface ISignInData {
    email: string;
    password: string;
}

export interface ISignUpData {
    email: string;
    name: string;
    password: string;
}

export interface IContext extends IUser {
    authenticate: ({ email, password }: ISignInData) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: ReactNode
}