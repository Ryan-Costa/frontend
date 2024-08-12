import { createContext, useState } from 'react';
import { IAuthProvider, IContext, ISignInData, IUser } from './types';
import { LoginRequest, setUserLocalStorage } from './util';

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>(null);

    async function authenticate({ email, password }: ISignInData) {
        const response: IUser = await LoginRequest(email, password)

        const payload = { access_token: response.access_token, email: response.email };

        setUser(payload)
        setUserLocalStorage(payload)
    }

    function logout() {
        setUser(null)
        setUserLocalStorage(null)
    }

    return (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}