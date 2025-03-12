import { AppStore } from 'src/lib/store';
import { QueryClient } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { makeChimericMutation } from 'src/utils/domain/makeChimericMutation';
import { removeActiveTodo } from '../activeTodoStore';
import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type IDeleteActiveTodo = (args: { id: string }) => Promise<void>;

export const deleteActiveTodo: IDeleteActiveTodo = async (args: {
  id: string;
}) => {
  return wrappedFetch<void>(`${getConfig().API_URL}/active-todo/${args.id}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const DeleteOneMethodImpl = (
  queryClient: QueryClient,
  appStore: AppStore,
): IActiveTodoService['deleteOne'] => {
  return makeChimericMutation({
    mutationFn: async (args) => {
      await deleteActiveTodo(args);
      appStore.dispatch(removeActiveTodo(args.id));
    },
    errorHelpers: {},
    onSuccess: async (_data, args) => {
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO, args.id],
      });
    },
  });
};
