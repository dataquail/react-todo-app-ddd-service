import { QueryClient, useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { completeActiveTodo } from '../network/completeActiveTodo';

export const CompleteOneMethodImpl = (queryClient: QueryClient) => {
  const promise = async (activeTodoId: string) => {
    const result = await completeActiveTodo(activeTodoId);
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
    useMutation: () => {
      return useMutation({
        mutationKey: [networkQueryKeys.COMPLETE_TODO],
        mutationFn: promise,
      });
    },
    errorHelpers: {},
  };
};
