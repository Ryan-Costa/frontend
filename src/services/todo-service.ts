import { Todo } from "@/types";
import Api from "./api";

export const getTodos = () => Api.get<Todo[]>('/todo').then((response) => response.data)

export const createTodo = (title: string) => Api.post('/todo', { title })

export const updateTodoTitleById = ({ id, title }: Todo) => Api.patch(`/todo/${id}`, { title: title })

export const toggleTodoDoneById = (todo: Todo) => Api.patch(`/todo/${todo.id}`, { done: !todo.done })

export const deleteTodoById = (id: string) => Api.delete<Todo>(`/todo/${id}`)