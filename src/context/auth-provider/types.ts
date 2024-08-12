import { ReactNode } from "react";

export interface IUser {
    email?: string;
    access_token?: string;
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: ReactNode
}