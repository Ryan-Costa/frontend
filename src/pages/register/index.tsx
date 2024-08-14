import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ISignUpData } from "@/context/auth-provider/types";
import { RegisterRequest } from "@/context/auth-provider/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z.object({
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome deve ter no máximo 50 caracteres'),
    password: z.string()
        .min(4, 'A senha deve ter no mínimo 4 caracteres')
        .max(20, 'A senha deve ter no máximo 20 caracteres')
        .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'A senha é muito fraca. Deve conter pelo menos uma letra maiúscula, uma letra minúscula, e um número ou símbolo.',
        }),
});

type RegisterProps = z.infer<typeof registerSchema>

const Register = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterProps>({
        resolver: zodResolver(registerSchema)
    });

    async function onSubmit({ email, name, password }: ISignUpData) {
        try {
            await RegisterRequest(email, name, password)
            toast.success('Cadastro realizado com sucesso.')
            navigate("/entrar")
        } catch {
            toast.error('Falha ao cadastrar. Por favor, tente novamente.')
        }
    }

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-custom-gradient">
            <img className="size-60" src="/ontime.svg" alt="logo" />

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[350px] flex flex-col gap-4 items-center justify-center">
                <h1 className="font-bold text-lg">Cadastrar</h1>
                <div className="min-w-[250px] flex flex-col gap-3">
                    <Input
                        className="bg-searchInput border-none text-tertiary outline-none rounded-full placeholder:text-searchInputText"
                        placeholder="E-mail"
                        {...register('email')}
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

                    <Input
                        className="bg-searchInput border-none text-tertiary outline-none rounded-full placeholder:text-searchInputText"
                        placeholder="Nome"
                        {...register('name')}
                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}

                    <Input
                        className="bg-searchInput border-none text-tertiary outline-none rounded-full placeholder:text-searchInputText"
                        type="password" placeholder="Senha"
                        {...register('password')}
                    />
                    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                </div>
                <div className="max-w-[150px] flex flex-col gap-2 w-full justify-center">
                    <Button
                        type="submit"
                        size="sm"
                        className="w-full bg-primary text-white hover:bg-white hover:text-tertiary text-md font-bold uppercase"
                    >
                        Cadastrar
                    </Button>
                </div>

                <div>
                    <p className="text-sm">Já tem cadastro? Entre <Link to="/entrar" className="underline">aqui</Link></p>
                </div>

            </form>
        </div>
    );
}

export default Register;