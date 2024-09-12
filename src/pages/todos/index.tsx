import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CornerRightDown, Search } from "lucide-react"
import Header from "@/components/header";
import TodoList from "@/pages/todos/todo-list";
import React, { useState } from "react";
import { useCreateTodoMutation } from "@/services/mutations/todo/create-todo-mutation";
import { useTodosQuery } from "@/services/queries/todo";
import NotFound from "../not-found";
import ListEmpty from "./list-empty";
import SkeletonTodos from "@/components/skeleton-todos";
import { z } from "zod";
import { toast } from "sonner";

const createTodoSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório').max(25, 'Título deve ter no máximo 25 caracteres'),
})

const Todos = () => {
    const [todo, setTodo] = useState<string>('');

    const { data: todos, isLoading, isError } = useTodosQuery()

    const { mutate: createTodoMutation } = useCreateTodoMutation();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLInputElement
        target.value = '';
        event.preventDefault();
        handleCreateTodo();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        handleCreateTodo();
    }

    const handleCreateTodo = () => {
        const result = createTodoSchema.safeParse({ title: todo })

        if (!result.success) {
            toast.error(result.error.errors[0].message);
            return;
        }
         
        createTodoMutation(todo);
        setTodo('')
    }
    
    if (isError) {
        return <NotFound />
    }

    return (
        <div className="w-full bg-custom-gradient flex items-center justify-center">
            <div className="max-w-[820px] w-full min-h-screen flex flex-col justify-start items-center px-7 pt-12 space-y-6 pb-12">
                <Header />
                <div className="w-full py-1 rounded-lg flex items-center justify-center">
                    <h1 className="text-lg bg-tertiary font-semibold px-10 py-2 rounded-lg">NOTES</h1>
                </div>
                <div className="w-full flex gap-2">
                    <div className="bg-searchInput rounded-full flex items-center px-2 w-full">
                        <Search className="text-searchInputText" />
                        <Input
                            className="bg-searchInput border-none text-searchInputText outline-none"
                            placeholder="Criar tarefa"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                            onKeyUp={handleKeyDown}
                        />
                    </div>
                    <Button
                        size="icon"
                        className="rounded-full p-2 hover:bg-searchInput hover:text-tertiary"
                        onClick={handleClick}
                        disabled={!todo.trim()}
                    >
                        <CornerRightDown />
                    </Button>
                </div>

                {(isLoading) ? <SkeletonTodos /> : (todos?.length) ? <TodoList todos={todos} /> : <ListEmpty missingContent="tarefas"/>}

            </div>
        </div >
    );
}

export default Todos;