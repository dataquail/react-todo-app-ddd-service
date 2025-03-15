import { AppStore } from 'src/lib/store';
import { QueryClient } from '@tanstack/react-query';
import { IApplicationEventEmitter } from 'src/core/global/ApplicationEventEmitter/IApplicationEventEmitter';
import { IActiveTodoService } from 'src/core/domain/activeTodo/ports/IActiveTodoService';
import { makeChimericMutation } from 'src/utils/domain/makeChimericMutation';
import { removeActiveTodo } from '../activeTodoStore';
import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { getQueryOptionsGetAll } from './getAll';
import { getQueryOptionsGetOneById } from './getOneById';
import { ActiveTodoDeletedEvent } from 'src/core/domain/activeTodo/events/ActiveTodoDeletedEvent';

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
  applicationEventEmitter: IApplicationEventEmitter,
): IActiveTodoService['deleteOne'] => {
  return makeChimericMutation({
    mutationFn: deleteActiveTodo,
    errorHelpers: {},
    onSuccess: async (_data, args) => {
      applicationEventEmitter.emit(new ActiveTodoDeletedEvent({ id: args.id }));
      appStore.dispatch(removeActiveTodo(args.id));
      await queryClient.invalidateQueries({
        queryKey: getQueryOptionsGetAll().queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: getQueryOptionsGetOneById(args).queryKey,
      });
    },
  });
};
