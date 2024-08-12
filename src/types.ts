export interface TodoProps {
    id: number;
    title: string;
    done: boolean;
    userId: number
}

export interface TodoListProps {
    todos: TodoProps[];
    setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
}

export interface Todo {
    id: string;
    title: string;
    done: boolean;
}
