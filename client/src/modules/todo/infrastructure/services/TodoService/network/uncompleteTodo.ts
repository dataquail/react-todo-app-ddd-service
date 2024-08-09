import { getConfig } from 'src/utils/getConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type IUncompleteTodo = (todoId: string) => Promise<void>;

export const uncompleteTodo: IUncompleteTodo = async (todoId) => {
  return wrappedFetch<void>(
    `${getConfig().API_URL}/todo/${todoId}/uncomplete`,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const useMutationUncompleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [networkQueryKeys.UNCOMPLETE_TODO],
    mutationFn: uncompleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
    },
  });
};
