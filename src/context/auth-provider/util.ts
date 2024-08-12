import Api from "@/services/api"
import { ICurrentUser, IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem('u', JSON.stringify(user))
}

export function getUserLocalStorage() {
    const json = localStorage.getItem('u');

    if (!json) {
        return null
    }

    try {
        const user: IUser = JSON.parse(json);
        return user;
    } catch {
        throw new Error('Failed to parse user data from localStorage');
    }
}

export async function LoginRequest(email: string, password: string) {
    try {
        const request = await Api.post('login', { email, password })

        return request.data;
    } catch {
        throw new Error('E-mail ou senha inválidos');
    }
}

export async function RegisterRequest(email: string, name: string, password: string) {
    try {
        const request = await Api.post('/user', { email, name, password })

        return request.data;
    } catch {
        throw new Error('E-mail já cadastrado ou senha inválida');
    }
}
export async function CurrentUser(): Promise<ICurrentUser> {
    try {
        const request = await Api.get('/me')

        return request.data
    } catch {
        throw new Error('Erro ao trazer dados do usuário')
    }
}