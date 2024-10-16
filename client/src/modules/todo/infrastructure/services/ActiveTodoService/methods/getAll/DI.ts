import { Singleton, Graph, Provides, ObjectGraph } from 'react-obsidian';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { type AppStore, useAppSelector } from 'src/lib/store';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { QueryOptions } from 'src/utils/domain/QueryOptions';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { ActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { saveAllActiveTodos } from '../../activeTodoStore';
import { ApplicationGraph } from 'src/api/global/ApplicationGraph';
import { getTodoList } from '../../network/getAllActiveTodos';
import { GetAll } from '.';

@Singleton()
@Graph({ subgraphs: [ApplicationGraph] })
export class GetAllGraph extends ObjectGraph {
  @Provides()
  getAllServiceMethod(appStore: AppStore) {
    return GetAll(getTodoList, (activeTodos) =>
      appStore.dispatch(saveAllActiveTodos(activeTodos)),
    );
  }

  @Provides()
  useQueryAsyncGetAll(
    getAllServiceMethod: ReturnType<GetAllGraph['getAllServiceMethod']>,
    appStore: AppStore,
    queryClient: QueryClient,
  ): IActiveTodoService['getAll']['queryAsync'] {
    return useCallback(
      async ({ forceRefetch } = {}) => {
        if (forceRefetch) {
          await queryClient.invalidateQueries({
            queryKey: [networkQueryKeys.GET_TODO_LIST],
          });
        }
        await queryClient.fetchQuery({
          queryKey: [networkQueryKeys.GET_TODO_LIST],
          queryFn: getAllServiceMethod,
        });
        return Object.values(appStore.getState().todo.activeTodos.dict).filter(
          Boolean,
        ) as ActiveTodo[];
      },
      [getAllServiceMethod, queryClient],
    );
  }

  @Provides()
  useMetaGetAll(
    getAllServiceMethod: ReturnType<GetAllGraph['getAllServiceMethod']>,
  ): IActiveTodoService['getAll']['useMeta'] {
    return this.constructGetAllHook({
      queryOptions: { enabled: false },
      getAllServiceMethod,
    });
  }

  @Provides()
  useQueryGetAll(
    getAllServiceMethod: ReturnType<GetAllGraph['getAllServiceMethod']>,
  ): IActiveTodoService['getAll']['useQuery'] {
    return this.constructGetAllHook({
      queryOptions: { enabled: true },
      getAllServiceMethod,
    });
  }

  constructGetAllHook({
    queryOptions,
    getAllServiceMethod,
  }: {
    queryOptions: QueryOptions;
    getAllServiceMethod: ReturnType<GetAllGraph['getAllServiceMethod']>;
  }) {
    return (): ReturnType<IActiveTodoService['getAll']['useMeta']> => {
      const query = useQuery({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
        queryFn: getAllServiceMethod,
        enabled: queryOptions.enabled,
      });
      const activeTodoListDictionary = useAppSelector(
        (state) => state.todo.activeTodos.dict,
      );

      return {
        ...query,
        data: useMemo(
          () =>
            Object.values(activeTodoListDictionary).filter(
              Boolean,
            ) as ActiveTodo[],
          [activeTodoListDictionary],
        ),
      };
    };
  }
}
