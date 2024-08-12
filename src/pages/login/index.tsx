import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth-provider/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    password: z.string()
        .min(4, 'A senha deve ter no mínimo 4 caracteres')
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

    async function onSubmit(values: { email: string, password: string }) {
        try {
            await authenticate(values.email, values.password)
            navigate('/')
        } catch {
            toast({
                description: 'E-mail ou senha inválidos'
            })
        }
    }


    return (
        <div className="flex flex-col items-center h-screen justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[350px] flex flex-col gap-4 items-center justify-center">
                <h1 className="font-bold text-lg">Login</h1>
                <div className="flex flex-col gap-3">
                    <Input placeholder="e-mail" {...register('email', { required: 'E-mail é obrigatório' })} />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    <Input placeholder="senha" {...register('password', { required: 'Senha é obrigatória' })} />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>
                <div className="max-w-[150px] flex flex-col gap-2 w-full justify-center">
                    <Button size="sm" className="w-full" type="submit">Entrar</Button>
                </div>
            </form>
            {/* <Button size="sm" className="w-full" asChild><Link to="/cadastrar">Cadastre-se</Link></Button> */}
        </div>
    );
}

export default Login;