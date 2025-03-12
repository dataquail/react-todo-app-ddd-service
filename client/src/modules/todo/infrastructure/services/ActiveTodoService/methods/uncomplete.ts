import { QueryClient } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { makeChimericMutation } from 'src/utils/domain/makeChimericMutation';
import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

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
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO, args.id],
      });
    },
  });
};
