import { QueryClient } from '@tanstack/react-query';
import { IActiveTodoService } from 'src/core/domain/activeTodo/ports/IActiveTodoService';
import { makeChimericMutation } from 'src/utils/domain/makeChimericMutation';
import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { getQueryOptionsGetAll } from './getAll';
import { getQueryOptionsGetOneById } from './getOneById';

export type IUncompleteActiveTodo = (args: { id: string }) => Promise<void>;

export const uncompleteActiveTodo: IUncompleteActiveTodo = async (args: {
  id: string;
}) => {
  return wrappedFetch<void>(
    `${getConfig().API_URL}/active-todo/${args.id}/uncomplete`,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const UncompleteOneMethodImpl = (
  queryClient: QueryClient,
): IActiveTodoService['uncompleteOne'] => {
  return makeChimericMutation({
    mutationFn: uncompleteActiveTodo,
    errorHelpers: {},
    onSuccess: async (_data, args) => {
      await queryClient.invalidateQueries({
        queryKey: getQueryOptionsGetAll().queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: getQueryOptionsGetOneById(args).queryKey,
      });
    },
  });
};
