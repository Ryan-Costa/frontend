import Api from "@/services/api"
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem('u', JSON.stringify(user))
}

export function getUserLocalStorage() {
    const json = localStorage.getItem('u');

    if (!json) {
        return null
    }

    try {
        const user = JSON.parse(json);
        return user;
    } catch {
        throw new Error('Failed to parse user data from localStorage');
    }
}

export async function LoginRequest (email: string, password: string) {
    try {
        const request = await Api.post('login', { email, password})

        return request.data;
    } catch {
        throw new Error('Failed to log in. Please check your credentials and try again.');
    }
}