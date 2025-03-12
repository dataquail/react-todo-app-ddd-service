import { QueryClient } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { makeChimericMutation } from 'src/utils/domain/makeChimericMutation';
import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type ICompleteActiveTodo = (args: { id: string }) => Promise<void>;

export const completeActiveTodo: ICompleteActiveTodo = async (args: {
  id: string;
}) => {
  return wrappedFetch<void>(
    `${getConfig().API_URL}/active-todo/${args.id}/complete`,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const CompleteOneMethodImpl = (
  queryClient: QueryClient,
): IActiveTodoService['completeOne'] => {
  return makeChimericMutation({
    mutationFn: completeActiveTodo,
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
