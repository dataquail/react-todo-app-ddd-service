import { useMutation, useQueryClient } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { CompleteOne } from '.';
import { completeActiveTodo } from '../../network/completeActiveTodo';

const completeOneServiceMethod = CompleteOne(completeActiveTodo);

export const useMutationCompleteOne = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [networkQueryKeys.COMPLETE_TODO],
    mutationFn: completeOneServiceMethod,
    onSuccess: async (_data, activeTodoId) => {
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
      });
    },
  });

  return {
    ...mutation,
    errorHelpers: {},
  };
};
