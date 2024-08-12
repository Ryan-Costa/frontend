import { useAuth } from "@/context/auth-provider/useAuth"

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
    const { email } = useAuth()

    if (!email) {
        return <h1>Tá sem email</h1>
    }

    return children
}