import { Button } from "../../../components/ui/button";
import { Check, TrashIcon, X } from "lucide-react";
import { useToggleDoneTodoMutation } from "@/services/mutations/todo/toggle-todo-mutation";
import { useDeleteTodoMutation } from "@/services/mutations/todo/delete-todo-mutation";
import { Todo } from "@/types";
import { useUpdateTodoMutation } from "@/services/mutations/todo/update-todo-mutation";
import { KeyboardEvent, useState } from "react";
import { Input } from "@/components/ui/input";

interface ListTodosProps {
    todos: Todo[];
}

const TodoList = ({ todos }: ListTodosProps) => {
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>("");

    const { mutate: toggleDoneTodoMutation } = useToggleDoneTodoMutation();
    const { mutate: deleteTodoMutation } = useDeleteTodoMutation()
    const { mutate: updateTitleTodoMutation } = useUpdateTodoMutation()

    const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>, todo: Todo) => {
        if (e.key === "Enter") {
            handleUpdateTitle(todo)
        }
    }

    const handleUpdateTitle = (todo: Todo) => {
        if (todo.title === editingTitle) {
            return
        }

        updateTitleTodoMutation({ ...todo, title: editingTitle });
    }

    return (
        <div className="w-full  space-y-4">
            {todos.map(todo => (
                <div key={todo.id} className={`${todo.done ? 'bg-primary/50' : 'bg-primary'} w-full p-4 rounded-lg flex justify-between items-center`}>
                    {editingTodoId === +todo.id ? (
                        <Input
                            className="outline-none border-none focus:outline-none p-0 text-md"
                            type="text"
                            value={editingTitle}
                            onKeyUp={(e) => handleOnKeyUp(e, todo)}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onBlur={() => handleUpdateTitle(todo)}
                            autoFocus
                        />
                    ) : (
                        <p
                            className={`${todo.done ? 'line-through' : ''} text-md`}
                            onClick={() => {
                                setEditingTodoId(+todo.id);
                                setEditingTitle(todo.title);
                            }}
                        >
                            {todo.title}
                        </p>
                    )}

                    <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => toggleDoneTodoMutation(todo)}>{!todo.done ? <Check /> : <X />}</Button>
                        <Button size="icon" variant="ghost" onClick={() => deleteTodoMutation(todo)}>
                            <TrashIcon />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TodoList;