import { QueryClient, useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { saveActiveTodoForLater } from '../network/saveActiveTodoForLater';
import { SaveForLaterBody } from 'src/modules/todo/domain/dtos/SaveForLaterBody';

export const SaveForLaterMethodImpl = (
  queryClient: QueryClient,
): ISavedForLaterTodoService['saveForLater'] => {
  const promise = async (saveForLaterBody: SaveForLaterBody) => {
    const result = await saveActiveTodoForLater(saveForLaterBody);
    console.log('invalidating queries');
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
    });
    console.log(1);
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO, result.id],
    });
    console.log(2);
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO, saveForLaterBody.activeTodoId],
    });
    console.log(3);
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO_LIST],
    });
    console.log(4);
    console.log('invalidated queries');
    return result;
  };

  return {
    mutateAsync: promise,
    useMutation: () =>
      useMutation({
        mutationKey: [networkQueryKeys.SAVE_FOR_LATER],
        mutationFn: promise,
      }),
    errorHelpers: {},
  };
};
