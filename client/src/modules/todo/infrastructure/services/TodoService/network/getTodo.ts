import { useCallback } from 'react';
import { getConfig } from 'src/utils/getConfig';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';

export type IGetTodo = (todoId: string) => Promise<TodoDto>;
export const getTodo: IGetTodo = async (todoId: string) => {
  return wrappedFetch<TodoDto>(`${getConfig().API_URL}/todo/${todoId}`);
};

export const useQueryGetTodo = (enabled: boolean = true, todoId: string) => {
  return useQuery({
    queryKey: [networkQueryKeys.GET_TODO_LIST],
    queryFn: async () => getTodo(todoId),
    enabled,
  });
};

export const useGetTodo = (): IGetTodo => {
  const queryClient = useQueryClient();
  return useCallback(
    (todoId: string) => {
      return queryClient.fetchQuery({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
        queryFn: () => getTodo(todoId),
      });
    },
    [queryClient],
  );
};
