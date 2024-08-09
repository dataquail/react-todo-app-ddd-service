import { getConfig } from 'src/utils/getConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type ICompleteTodo = (todoId: string) => Promise<void>;

export const completeTodo: ICompleteTodo = async (todoId) => {
  return wrappedFetch<void>(`${getConfig().API_URL}/todo/${todoId}/complete`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const useMutationCompleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [networkQueryKeys.COMPLETE_TODO],
    mutationFn: completeTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
    },
  });
};
