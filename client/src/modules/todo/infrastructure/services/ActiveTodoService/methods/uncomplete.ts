import { QueryClient, useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { uncompleteActiveTodo } from '../network/uncompleteActiveTodo';

export const UncompleteOneMethodImpl = (queryClient: QueryClient) => {
  const promise = async (activeTodoId: string) => {
    const result = await uncompleteActiveTodo(activeTodoId);
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO_LIST],
    });
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
    });
    return result;
  };

  return {
    mutateAsync: promise,
    useMutation: () =>
      useMutation({
        mutationKey: [networkQueryKeys.UNCOMPLETE_TODO],
        mutationFn: promise,
      }),
    errorHelpers: {},
  };
};
