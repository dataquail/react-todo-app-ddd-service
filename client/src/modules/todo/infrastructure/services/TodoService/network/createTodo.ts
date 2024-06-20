import { getConfig } from 'src/utils/getConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'src/utils/network/queryKeys';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';

export type ICreateTodo = (createTodoBody: CreateTodoBody) => Promise<void>;

export const createTodo: ICreateTodo = async (createTodoBody) => {
  return wrappedFetch<void>(`${getConfig().API_URL}/todo`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createTodoBody),
  });
};

export const useMutationCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [queryKeys.CREATE_TODO],
    mutationFn: createTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_TODO_LIST],
      });
    },
  });
};
