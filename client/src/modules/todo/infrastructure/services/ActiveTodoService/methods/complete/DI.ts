import { QueryClient, useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { CompleteOne } from '.';
import { completeActiveTodo } from '../../network/completeActiveTodo';

export const CompleteOneMethodImpl = (queryClient: QueryClient) => {
  const completeOneServiceMethod = CompleteOne(completeActiveTodo);

  const mutationFn = async (activeTodoId: string) => {
    const result = await completeOneServiceMethod(activeTodoId);
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
        mutationKey: [networkQueryKeys.COMPLETE_TODO],
        mutationFn,
      });
    },
    errorHelpers: {},
  };
};
