import { useMutation } from "@tanstack/react-query";
import { todosQuery } from "../../queries/todo";
import { queryClient } from "../../queries/query-client";
import { createTodo } from "../../todo-service";
import { toast } from "sonner";

export const useCreateTodoMutation = () => useMutation({
  mutationFn: (todoName: string) => createTodo(todoName),
  onMutate: (todoName) => {
    const previousTodos = queryClient.getQueryData(todosQuery.queryKey);
    queryClient.setQueryData(todosQuery.queryKey, (old) => [...old!, { id: String(new Date()), title: todoName, done: false }])
    return { previousTodos };
  },
  onSettled: () => {
    return queryClient.invalidateQueries({
      queryKey: todosQuery.queryKey,
    })
  },
  onSuccess: () => {
    toast.success('Tarefa criada com sucesso!')
  },
  onError: (_error, _variables, context, ) => {
    queryClient.setQueryData(todosQuery.queryKey, context?.previousTodos)
    toast.error('Erro ao criar tarefa!')
  }
})