import { queryClient } from "@/services/queries/query-client";
import { todosQuery } from "@/services/queries/todo";
import { updateTodoTitleById } from "@/services/todo-service";
import { useMutation } from "@tanstack/react-query";
import { Todo } from "@/types";
import { toast } from "sonner";

export const useUpdateTodoMutation = () => useMutation({
    mutationFn: (todo: Todo) => updateTodoTitleById(todo),
    onMutate: async (updatedTodo) => {
        await queryClient.cancelQueries({
            queryKey: todosQuery.queryKey,
        });
        const previousTodos = queryClient.getQueryData(todosQuery.queryKey);
        queryClient.setQueryData(todosQuery.queryKey, (old) =>
            old?.map(todo =>
                todo.id === updatedTodo.id ? { ...todo, title: todo.title } : todo
            )
        )

        return { previousTodos }
    },
    onSettled: () => {
        queryClient.invalidateQueries({
            queryKey: todosQuery.queryKey,
        });
    },
    onSuccess: () => {
        toast.success('Título da tarefa atualizado com sucesso!')
    },
    onError: (_error, _variables, context) => {
        queryClient.setQueryData(todosQuery.queryKey, context?.previousTodos);
        toast.error('Erro ao atualizar título da tarefa!')
    },
})