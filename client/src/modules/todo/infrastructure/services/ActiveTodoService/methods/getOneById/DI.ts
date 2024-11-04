import { useQuery } from '@tanstack/react-query';
import { GetOneById } from '.';
import { useAppSelector } from 'src/lib/store';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { getActiveTodo } from '../../network/getActiveTodo';
import { IAppStore } from 'src/modules/global/appStore/IAppStore';
import { IQueryClient } from 'src/modules/global/queryClient/IQueryClient';
import { saveActiveTodo } from '../../activeTodoStore';

export const GetOneByIdMethodImpl = (
  appStore: IAppStore,
  queryClient: IQueryClient,
): IActiveTodoService['getOneById'] => {
  const getOneByIdServiceMethod = GetOneById(getActiveTodo, (activeTodo) =>
    appStore.dispatch(saveActiveTodo(activeTodo)),
  );

  return {
    queryAsync: async ({ forceRefetch, activeTodoId }) => {
      if (forceRefetch) {
        await queryClient.invalidateQueries({
          queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
        });
      }
      await queryClient.fetchQuery({
        queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
        queryFn: () => getOneByIdServiceMethod(activeTodoId),
      });

      return appStore.getState().todo.activeTodos.dict[activeTodoId];
    },
    useQuery: ({ activeTodoId, enabled }) => {
      const query = useQuery({
        queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
        queryFn: () => getOneByIdServiceMethod(activeTodoId),
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
