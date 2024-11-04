import { useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { Activate } from '.';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { ActivateBody } from 'src/modules/todo/domain/dtos/ActivateBody';
import { activate } from '../../network/activate';
import { IQueryClient } from 'src/modules/global/IQueryClient';

export const ActivateMethodImpl = (
  queryClient: IQueryClient,
): ISavedForLaterTodoService['activate'] => {
  const activateServiceMethod = Activate(activate);

  const mutationFn = async (activateBody: ActivateBody) => {
    const result = await activateServiceMethod(activateBody);
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
    mutateAsync: mutationFn,
    useMutation: () => {
      return useMutation({
        mutationKey: [networkQueryKeys.SAVE_FOR_LATER],
        mutationFn,
      });
    },
    errorHelpers: {},
  };
};
