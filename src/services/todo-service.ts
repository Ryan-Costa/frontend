import { Todos } from "@/types";
import Api from "./api";

export const getTodos = () => Api.get<Todos[]>('/todo').then((response) => response.data)


export const createTodo = (title: string) => Api.post('/todo', { title })

export const updateTodoTitleById = ({ id, title }: Todos) => Api.patch(`/todo/${id}`, { title: title })

export const toggleTodoDoneById = (todo: Todos) => Api.patch(`/todo/${todo.id}`, { done: !todo.done })

export const deleteTodoById = (id: string) => Api.delete<Todos>(`/todo/${id}`)