import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CornerRightDown, Search } from "lucide-react"
import Header from "@/components/header";
import TodoList from "@/pages/todos/todo-list";
import { useState } from "react";
import { useCreateTodoMutation } from "@/services/mutations/todo/create-todo-mutation";
import { useTodosQuery } from "@/services/queries/todo";

const Todos = () => {
    const [todo, setTodos] = useState('');

    const { data: todos, isLoading, isError } = useTodosQuery()

    const { mutate: createTodoMutation } = useCreateTodoMutation();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        createTodoMutation(todo);
    }

    if (isLoading) return 'Carregando...';

    if (isError) return 'Opa, algo deu errado...';

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
                            onKeyUp={handleKeyDown}
                            onChange={(e) => setTodos(e.target.value)}
                        />
                    </div>
                    <Button
                        size="icon"
                        className="rounded-full p-2 hover:bg-searchInput hover:text-tertiary"
                        onClick={() => createTodoMutation(todo)}
                    >
                        <CornerRightDown />
                    </Button>
                </div>

                {todos?.length ? <TodoList todos={todos} /> : <h1>No tasks</h1>}
            </div>
        </div >
    );
}

export default Todos;