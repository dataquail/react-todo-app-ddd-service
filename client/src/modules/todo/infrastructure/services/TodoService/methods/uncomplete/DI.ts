import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceQueryKeys } from 'src/modules/todo/domain/services/serviceQueryKeys';
import { useMutationUncompleteTodo } from 'src/modules/todo/infrastructure/services/TodoService/network/uncompleteTodo';
import { Uncomplete } from '.';

const useUncompleteServiceMethod = () => {
  const { mutateAsync } = useMutationUncompleteTodo();
  return useMemo(() => Uncomplete(mutateAsync), [mutateAsync]);
};

export const useMutationUncomplete = () => {
  const queryClient = useQueryClient();
  const uncompleteTodo = useUncompleteServiceMethod();

  return useMutation({
    mutationKey: [serviceQueryKeys.TODO_UNCOMPLETE],
    mutationFn: uncompleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [serviceQueryKeys.TODO_GET_ALL],
      });
    },
  });
};
