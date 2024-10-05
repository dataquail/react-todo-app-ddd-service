import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetOneById } from '.';
import { useGetTodo } from '../../network/getTodo';
import { serviceQueryKeys } from 'src/modules/todo/domain/services/serviceQueryKeys';
import { todoStore } from '../../store';

const useGetOneByIdServiceMethod = () => {
  const getTodo = useGetTodo();
  return useMemo(() => GetOneById(getTodo, todoStore), [getTodo]);
};

export const useQueryGetOneById = (enabled: boolean = true, todoId: string) => {
  const getOneById = useGetOneByIdServiceMethod();

  return useQuery({
    queryKey: [serviceQueryKeys.TODO_GET_ONE_BY_ID],
    queryFn: () => getOneById(todoId),
    enabled,
  });
};

export const useGetOneById = () => {
  const queryClient = useQueryClient();
  const getOneById = useGetOneByIdServiceMethod();

  return useCallback(
    (todoId: string) => {
      return queryClient.fetchQuery({
        queryKey: [serviceQueryKeys.TODO_GET_ONE_BY_ID],
        queryFn: () => getOneById(todoId),
      });
    },
    [queryClient, getOneById],
  );
};
