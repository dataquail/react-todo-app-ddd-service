import { useCallback } from 'react';
import { getConfig } from 'src/utils/getConfig';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { TodoListDto } from 'src/modules/todo/domain/dtos/TodoListDto';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type IGetTodoList = () => Promise<TodoListDto>;
export const getTodoList: IGetTodoList = async () => {
  return wrappedFetch<TodoListDto>(`${getConfig().API_URL}/todo`);
};

export const useQueryGetTodoList = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [networkQueryKeys.GET_TODO_LIST],
    queryFn: async () => getTodoList(),
    enabled,
  });
};

export const useGetTodoList = (): IGetTodoList => {
  const queryClient = useQueryClient();
  return useCallback(() => {
    return queryClient.fetchQuery({
      queryKey: [networkQueryKeys.GET_TODO_LIST],
      queryFn: getTodoList,
    });
  }, [queryClient]);
};
