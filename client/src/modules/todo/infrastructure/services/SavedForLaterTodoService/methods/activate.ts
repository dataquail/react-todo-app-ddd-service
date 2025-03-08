import { QueryClient, useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { ActivateBody } from 'src/modules/todo/domain/dtos/ActivateBody';
import { activate } from '../network/activate';

export const ActivateMethodImpl = (
  queryClient: QueryClient,
): ISavedForLaterTodoService['activate'] => {
  const promise = async (activateBody: ActivateBody) => {
    const result = await activate(activateBody);
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
    });
    await queryClient.invalidateQueries({
      queryKey: [
        networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
        activateBody.savedForLaterTodoId,
      ],
    });
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO_LIST],
    });
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO, result.id],
    });
    return result;
  };

  return {
    mutateAsync: promise,
    useMutation: () => {
      return useMutation({
        mutationKey: [networkQueryKeys.SAVE_FOR_LATER],
        mutationFn: promise,
      });
    },
    errorHelpers: {},
  };
};
