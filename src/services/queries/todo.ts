import { queryOptions, useQuery } from "@tanstack/react-query";
import { getTodos } from "../todo-service";

export const todosQuery = queryOptions({
  queryKey: ['todos'],
  queryFn: () => getTodos(),
})

export const useTodosQuery = () => useQuery(todosQuery);