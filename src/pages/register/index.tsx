import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="flex flex-col items-center h-screen justify-center">
            <div className="max-w-[350px] flex flex-col gap-4 items-center justify-center">
                <h1 className="font-bold text-lg">Cadastrar</h1>
                <div className="flex flex-col gap-3">
                    <Input placeholder="e-mail" />
                    <Input placeholder="nome" />
                    <Input placeholder="senha" />
                </div>
                <div className="max-w-[150px] flex flex-col gap-2 w-full justify-center">
                    <Button size="sm" className="w-full">Cadastrar</Button>
                </div>

                <div>
                    <p className="text-sm">Já tem cadastro? Entre <Link to="/entrar" className="underline">aqui</Link></p>
                </div>

            </div>
        </div>
    );
}

export default Register;