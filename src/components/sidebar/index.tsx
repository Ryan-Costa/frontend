import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useAuth } from "@/context/auth-provider/useAuth";
import { useEffect, useState } from "react";
import { ICurrentUser } from "@/context/auth-provider/types";
import { getCurrentUser } from "@/services/get-user";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const currentUser = await getCurrentUser()
                setCurrentUser(currentUser)
            } catch (err) {
                console.error('Erro ao buscar dados do usuário', err)
            }
        }
        fetchCurrentUser();
    }, [logout])

    return (
        <Sheet>
            <SheetTrigger>
                <Button size="icon" variant="ghost" className="size-10">
                    <DotsVerticalIcon className="size-6" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
                <div className="w-full flex items-start flex-col">
                    <SheetTitle className="">Olá, <span className="capitalize">{currentUser?.name}</span></SheetTitle>
                    <span className="">{currentUser?.email}</span>
                </div>

                <SheetClose className="w-full">
                    <Button className="w-full" onClick={async () => {
                        await logout()
                        navigate("/entrar")
                    }}>Logout</Button>
                </SheetClose>
            </SheetContent>
        </Sheet>
    );
}

export default Sidebar;