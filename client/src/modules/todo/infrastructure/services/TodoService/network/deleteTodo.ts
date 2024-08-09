import { getConfig } from 'src/utils/getConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type IDeleteTodo = (todoId: string) => Promise<void>;

export const deleteTodo: IDeleteTodo = async (todoId) => {
  return wrappedFetch<void>(`${getConfig().API_URL}/todo/${todoId}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const useMutationDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [networkQueryKeys.DELETE_TODO],
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
    },
  });
};
