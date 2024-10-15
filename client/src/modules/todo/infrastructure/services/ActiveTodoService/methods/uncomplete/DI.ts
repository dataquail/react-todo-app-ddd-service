import { useMutation, useQueryClient } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { UncompleteOne } from '.';
import { uncompleteActiveTodo } from '../../network/uncompleteActiveTodo';

const uncompleteOneServiceMethod = UncompleteOne(uncompleteActiveTodo);

export const useMutationUncompleteOne = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [networkQueryKeys.UNCOMPLETE_TODO],
    mutationFn: uncompleteOneServiceMethod,
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
