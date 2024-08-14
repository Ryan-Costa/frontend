import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../queries/query-client";
import { todosQuery } from "../../queries/todo";
import { deleteTodoById } from "../../todo-service";
import { toast } from "sonner";
import { Todo } from "@/types";

export const useDeleteTodoMutation = () => useMutation({
  mutationFn: (todo: Todo) => deleteTodoById(todo.id),
  onMutate: (deletedTodo) => {
    const previousTodos = queryClient.getQueryData(todosQuery.queryKey);
    queryClient.setQueryData(todosQuery.queryKey, (old) => old?.filter(todo => todo.id !== deletedTodo.id))
    return { previousTodos };
  },
  onSettled: () => {
    return queryClient.invalidateQueries({
      queryKey: todosQuery.queryKey,
    })
  },
  onSuccess: () => {
    toast.success('Tarefa excluída com sucesso!')
  },
  onError: (_error, _variables, context) => {
    queryClient.setQueryData(todosQuery.queryKey, context?.previousTodos)
    toast.error('Erro ao excluir a tarefa!')
  }
})