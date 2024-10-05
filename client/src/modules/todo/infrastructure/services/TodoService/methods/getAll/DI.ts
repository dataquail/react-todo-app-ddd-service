import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetAll } from '.';
import { useGetTodoList } from '../../network/getTodoList';
import { serviceQueryKeys } from 'src/modules/todo/domain/services/serviceQueryKeys';
import { todoStore } from '../../store';

const useGetAllServiceMethod = () => {
  const getTodoList = useGetTodoList();
  return useMemo(() => GetAll(getTodoList, todoStore), [getTodoList]);
};

export const useQueryGetAll = (enabled: boolean = true) => {
  const getAll = useGetAllServiceMethod();

  return useQuery({
    queryKey: [serviceQueryKeys.TODO_GET_ALL],
    queryFn: getAll,
    enabled,
  });
};

export const useGetAll = () => {
  const queryClient = useQueryClient();
  const getAll = useGetAllServiceMethod();

  return useCallback(() => {
    return queryClient.fetchQuery({
      queryKey: [serviceQueryKeys.TODO_GET_ALL],
      queryFn: getAll,
    });
  }, [queryClient, getAll]);
};
