import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { email } = useAuth()
    const navigate = useNavigate()

    const handleClickAction = () => {
        navigate("/todos")
    }

    return (
        <div className="flex flex-col item-center justify-around p-14 bg-custom-gradient h-screen w-full">
            <div className="w-full flex justify-center">
                <img src="/ontime.svg" alt="logo" className="2xl:w-[200px]" />
            </div>


            <p className="text-center text-4xl font-light">Crie tarefas <br />rapidamente!</p>

            <div className="flex items-center justify-center">
                <Button size={"lg"} className="bg-primary text-white text-2xl font-bold rounded-2xl py-7 hover:bg-white hover:text-tertiary uppercase" onClick={() => handleClickAction()}>
                    {email ? "go to todos" : "entrar"}
                </Button>
            </div>
        </div>
    );
}

export default Home;