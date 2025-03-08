import { QueryClient, useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { deleteSavedForLaterTodo } from '../network/deleteSavedForLaterTodo';

export const DeleteOneMethodImpl = (
  queryClient: QueryClient,
): ISavedForLaterTodoService['deleteOne'] => {
  const promise = async (savedForLaterTodoId: string) => {
    const result = await deleteSavedForLaterTodo(savedForLaterTodoId);
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
    });
    await queryClient.invalidateQueries({
      queryKey: [
        networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
        savedForLaterTodoId,
      ],
    });
    return result;
  };

  return {
    mutateAsync: promise,
    useMutation: () => {
      return useMutation({
        mutationKey: [networkQueryKeys.DELETE_SAVED_FOR_LATER_TODO],
        mutationFn: promise,
      });
    },
    errorHelpers: {},
  };
};
