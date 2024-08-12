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
            <img src="/ontime.svg" alt="logo" />

            <p className="text-center text-4xl font-light">Make yourself <br />more one time</p>

            <Button size={"lg"} className="bg-white text-black text-2xl font-bold rounded-2xl py-7" onClick={() => handleClickAction()}>
                {email ? "GO TO TODOS" : "ENTRAR"}
            </Button>
        </div>
    );
}

export default Home;