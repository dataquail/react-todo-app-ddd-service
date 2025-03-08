import { QueryClient, useQuery } from '@tanstack/react-query';
import { AppStore, useAppSelector } from 'src/lib/store';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { getActiveTodo } from '../network/getActiveTodo';
import { saveActiveTodo } from '../activeTodoStore';
import { mapTodoDtoToActiveTodo } from 'src/modules/todo/domain/ActiveTodo';

export const GetOneByIdMethodImpl = (
  appStore: AppStore,
  queryClient: QueryClient,
): IActiveTodoService['getOneById'] => {
  const promise = async (args: { activeTodoId: string }) => {
    const activeTodoDto = await getActiveTodo(args.activeTodoId);
    appStore.dispatch(saveActiveTodo(mapTodoDtoToActiveTodo(activeTodoDto)));
    return null;
  };

  return {
    queryAsync: async ({ forceRefetch, activeTodoId }) => {
      if (forceRefetch) {
        await queryClient.invalidateQueries({
          queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
        });
      }
      await queryClient.fetchQuery({
        queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
        queryFn: () => promise({ activeTodoId }),
      });

      return appStore.getState().todo.activeTodos.dict[activeTodoId];
    },
    useQuery: ({ activeTodoId, enabled }) => {
      const query = useQuery({
        queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
        queryFn: () => promise({ activeTodoId }),
        enabled: enabled,
      });
      const activeTodo = useAppSelector(
        (state) => state.todo.activeTodos.dict[activeTodoId],
      );

      return {
        ...query,
        data: activeTodo,
      };
    },
    errorHelpers: {},
  };
};
