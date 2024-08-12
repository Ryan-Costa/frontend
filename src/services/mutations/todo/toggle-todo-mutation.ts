import { useMutation } from "@tanstack/react-query";
import { todosQuery } from "../../queries/todo";
import { queryClient } from "../../queries/query-client";
import { toggleTodoDoneById } from "../../todo-service";
import { toast } from "sonner";
import { Todo } from "@/types";

export const useToggleDoneTodoMutation = () => useMutation({
  mutationFn: (todo: Todo) => toggleTodoDoneById(todo),
  onMutate: async (updatedTodo) => {
    await queryClient.cancelQueries({
      queryKey: todosQuery.queryKey,
    });
    const previousTodos = queryClient.getQueryData(todosQuery.queryKey);
    queryClient.setQueryData(todosQuery.queryKey, (old) =>
      old?.map(todo =>
        todo.id === updatedTodo.id ? { ...todo, done: !todo.done } : todo
      )
    );

    return { previousTodos };
  },
  onSettled: () => {
    queryClient.invalidateQueries({
      queryKey: todosQuery.queryKey,
    });
  },
  onSuccess: () => {
    toast.success('Status da tarefa atualizado com sucesso!')
  },
  onError: (_error, _variables, context) => {
    queryClient.setQueryData(todosQuery.queryKey, context?.previousTodos);
    toast.error('Erro ao atualizar status da tarefa!')
  },
});