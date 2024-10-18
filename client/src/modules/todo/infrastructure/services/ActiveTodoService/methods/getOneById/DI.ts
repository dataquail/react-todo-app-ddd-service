import { useQuery, QueryClient } from '@tanstack/react-query';
import { GetOneById } from '.';
import { useAppSelector, type AppStore } from 'src/lib/store';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { getActiveTodo } from '../../network/getActiveTodo';
import { Graph, Provides, ObjectGraph } from 'react-obsidian';
import { ApplicationGraph } from 'src/global/ApplicationGraph';

@Graph({ subgraphs: [ApplicationGraph] })
export class GetOneByIdMethod extends ObjectGraph {
  private constructQueryAsync(
    getOneByIdServiceMethod: ReturnType<typeof GetOneById>,
    appStore: AppStore,
    queryClient: QueryClient,
  ): IActiveTodoService['getOneById']['queryAsync'] {
    return async ({ forceRefetch, activeTodoId }) => {
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
    };
  }

  private constructUseQuery({
    getOneByIdServiceMethod,
  }: {
    getOneByIdServiceMethod: ReturnType<typeof GetOneById>;
  }): IActiveTodoService['getOneById']['useQuery'] {
    return ({ activeTodoId, enabled }) => {
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
    };
  }

  @Provides()
  getOneByIdImpl(
    appStore: AppStore,
    queryClient: QueryClient,
  ): IActiveTodoService['getOneById'] {
    const getOneByIdServiceMethod = GetOneById(getActiveTodo, appStore);

    return {
      queryAsync: this.constructQueryAsync(
        getOneByIdServiceMethod,
        appStore,
        queryClient,
      ),
      useQuery: this.constructUseQuery({
        getOneByIdServiceMethod,
      }),
      errorHelpers: {},
    };
  }
}
