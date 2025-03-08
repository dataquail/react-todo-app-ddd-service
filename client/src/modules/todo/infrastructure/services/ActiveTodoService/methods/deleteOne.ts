import { QueryClient, useMutation } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { deleteActiveTodo } from '../network/deleteActiveTodo';
import { removeActiveTodo } from '../activeTodoStore';
import { AppStore } from 'src/lib/store';

export const DeleteOneMethodImpl = (
  queryClient: QueryClient,
  appStore: AppStore,
) => {
  const promise = async (activeTodoId: string) => {
    await deleteActiveTodo(activeTodoId);
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO_LIST],
    });
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
    });
    appStore.dispatch(removeActiveTodo(activeTodoId));
  };

  return {
    mutateAsync: promise,
    useMutation: () => {
      return useMutation({
        mutationKey: [networkQueryKeys.DELETE_TODO],
        mutationFn: promise,
      });
    },
    errorHelpers: {},
  };
};
