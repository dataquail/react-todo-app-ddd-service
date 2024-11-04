import { useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { DeleteOne } from '.';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { deleteSavedForLaterTodo } from '../../network/deleteSavedForLaterTodo';
import { IQueryClient } from 'src/modules/global/IQueryClient';

export const DeleteOneMethodImpl = (
  queryClient: IQueryClient,
): ISavedForLaterTodoService['deleteOne'] => {
  const deleteOneServiceMethod = DeleteOne(deleteSavedForLaterTodo);

  const mutationFn = async (savedForLaterTodoId: string) => {
    const result = await deleteOneServiceMethod(savedForLaterTodoId);
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
    mutateAsync: mutationFn,
    useMutation: () => {
      return useMutation({
        mutationKey: [networkQueryKeys.DELETE_SAVED_FOR_LATER_TODO],
        mutationFn,
      });
    },
    errorHelpers: {},
  };
};
