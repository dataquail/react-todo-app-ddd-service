import { useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { UncompleteOne } from '.';
import { uncompleteActiveTodo } from '../../network/uncompleteActiveTodo';
import { IQueryClient } from 'src/modules/global/queryClient/IQueryClient';

export const UncompleteOneMethodImpl = (queryClient: IQueryClient) => {
  const uncompleteOneServiceMethod = UncompleteOne(uncompleteActiveTodo);

  const mutationFn = async (activeTodoId: string) => {
    const result = await uncompleteOneServiceMethod(activeTodoId);
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO_LIST],
    });
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
    });
    return result;
  };

  return {
    mutateAsync: mutationFn,
    useMutation: () => {
      return useMutation({
        mutationKey: [networkQueryKeys.UNCOMPLETE_TODO],
        mutationFn,
      });
    },
    errorHelpers: {},
  };
};
