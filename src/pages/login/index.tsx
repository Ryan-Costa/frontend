import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ISignInData } from "@/context/auth-provider/types";
import { useAuth } from "@/context/auth-provider/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    password: z.string()
        .min(4, 'A senha é obrigatória')
        .max(20, 'A senha deve ter no máximo 20 caracteres')
        .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'A senha é muito fraca. Deve conter pelo menos uma letra maiúscula, uma letra minúscula, e um número ou símbolo.',
        }),
});

type LoginProps = z.infer<typeof loginSchema>

const Login = () => {
    const { authenticate } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginProps>({
        resolver: zodResolver(loginSchema)
    });

    async function onSubmit({ email, password }: ISignInData) {
        try {
            await authenticate({ email, password })
            navigate('/')
        } catch {
            toast.error('E-mail ou senha inválidos')
        }
    }


    return (
        <div className="flex flex-col items-center h-screen justify-center space-y-25 bg-custom-gradient">
            <img className="size-60" src="/ontime.svg" alt="logo" />
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[350px] flex flex-col gap-4 items-center justify-center">
                <h1 className="font-bold text-lg">Entrar</h1>
                <div className="min-w-[250px] flex flex-col gap-3">
                    <Input className="bg-searchInput border-none text-tertiary outline-none rounded-full placeholder:text-searchInputText" placeholder="E-mail" {...register('email', { required: 'E-mail é obrigatório' })} />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    <Input
                        className="bg-searchInput border-none text-tertiary outline-none rounded-full placeholder:text-searchInputText"
                        type="password"
                        placeholder="Senha"
                        {...register('password')}
                    />
                    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                </div>
                <div className="max-w-[150px] flex flex-col gap-2 w-full justify-center ">
                    <Button size="sm" className="w-full bg-primary text-white hover:bg-white hover:text-tertiary text-md font-bold uppercase" type="submit">Entrar</Button>
                </div>
                <p className="text-sm">Não tem cadastro? Clique <Link to="/cadastrar" className="underline">aqui</Link>!</p>
            </form>
        </div>
    );
}

export default Login;