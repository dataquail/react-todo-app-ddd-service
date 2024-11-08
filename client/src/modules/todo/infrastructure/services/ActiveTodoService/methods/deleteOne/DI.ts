import { QueryClient, useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { DeleteOne } from '.';
import { deleteActiveTodo } from '../../network/deleteActiveTodo';
import { removeActiveTodo } from '../../activeTodoStore';
import { AppStore } from 'src/lib/store';

export const DeleteOneMethodImpl = (
  queryClient: QueryClient,
  appStore: AppStore,
) => {
  const deleteOneServiceMethod = DeleteOne(deleteActiveTodo, (activeTodoId) =>
    appStore.dispatch(removeActiveTodo(activeTodoId)),
  );

  const mutationFn = async (activeTodoId: string) => {
    const result = await deleteOneServiceMethod(activeTodoId);
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
        mutationKey: [networkQueryKeys.DELETE_TODO],
        mutationFn,
      });
    },
    errorHelpers: {},
  };
};
