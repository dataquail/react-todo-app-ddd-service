import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceQueryKeys } from 'src/modules/todo/domain/services/serviceQueryKeys';
import { useMutationCompleteTodo } from 'src/modules/todo/infrastructure/services/TodoService/network/completeTodo';
import { Complete } from '.';

const useCompleteServiceMethod = () => {
  const { mutateAsync } = useMutationCompleteTodo();
  return useMemo(() => Complete(mutateAsync), [mutateAsync]);
};

export const useMutationComplete = () => {
  const queryClient = useQueryClient();
  const completeTodo = useCompleteServiceMethod();

  return useMutation({
    mutationKey: [serviceQueryKeys.TODO_COMPLETE],
    mutationFn: completeTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [serviceQueryKeys.TODO_GET_ALL],
      });
    },
  });
};
