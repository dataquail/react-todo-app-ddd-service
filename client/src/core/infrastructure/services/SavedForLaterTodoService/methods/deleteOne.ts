import { QueryClient } from '@tanstack/react-query';
import { ISavedForLaterTodoService } from 'src/core/domain/savedForLaterTodo/ports/ISavedForLaterTodoService';
import { makeChimericMutation } from 'src/utils/domain/makeChimericMutation';
import { getQueryOptionsGetAll } from './getAll';
import { getQueryOptionsGetOneById } from './getOneById';
import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { IApplicationEventEmitter } from 'src/core/global/ApplicationEventEmitter/IApplicationEventEmitter';
import { SavedForLaterTodoDeletedEvent } from 'src/core/domain/savedForLaterTodo/events/SavedForLaterTodoDeletedEvent';

export type IDeleteSavedForLaterTodo = (args: { id: string }) => Promise<void>;

export const deleteSavedForLaterTodo: IDeleteSavedForLaterTodo = async (args: {
  id: string;
}) => {
  return wrappedFetch<void>(
    `${getConfig().API_URL}/saved-for-later-todo/${args.id}`,
    {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const DeleteOneMethodImpl = (
  queryClient: QueryClient,
  applicationEventEmitter: IApplicationEventEmitter,
): ISavedForLaterTodoService['deleteOne'] => {
  return makeChimericMutation({
    mutationFn: deleteSavedForLaterTodo,
    errorHelpers: {},
    onSuccess: async (_data, args) => {
      applicationEventEmitter.emit(
        new SavedForLaterTodoDeletedEvent({ id: args.id }),
      );
      await queryClient.invalidateQueries({
        queryKey: getQueryOptionsGetAll().queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: getQueryOptionsGetOneById(args).queryKey,
      });
    },
  });
};
