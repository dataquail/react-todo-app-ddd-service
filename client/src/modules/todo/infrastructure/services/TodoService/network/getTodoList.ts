import { useCallback } from 'react';
import { getConfig } from 'src/utils/getConfig';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'src/utils/network/queryKeys';
import { TodoListDto } from 'src/modules/todo/domain/dtos/TodoListDto';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type IGetTodoList = () => Promise<TodoListDto>;
export const getTodoList: IGetTodoList = async () => {
  return wrappedFetch<TodoListDto>(`${getConfig().API_URL}/todo`);
};

export const useQueryGetTodoList = () => {
  return useQuery({
    queryKey: [queryKeys.GET_TODO_LIST],
    queryFn: async () => getTodoList(),
  });
};

export const useGetTodoList = (): IGetTodoList => {
  const queryClient = useQueryClient();
  return useCallback(() => {
    return queryClient.fetchQuery({
      queryKey: [queryKeys.GET_TODO_LIST],
      queryFn: getTodoList,
    });
  }, [queryClient]);
};
