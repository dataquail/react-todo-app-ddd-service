import { Graph, Provides, ObjectGraph } from 'react-obsidian';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { type AppStore, useAppSelector } from 'src/lib/store';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { ActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { saveAllActiveTodos } from '../../activeTodoStore';
import { ApplicationGraph } from 'src/api/global/ApplicationGraph';
import { getTodoList } from '../../network/getAllActiveTodos';
import { GetAll } from '.';

@Graph({ subgraphs: [ApplicationGraph] })
export class GetAllMethod extends ObjectGraph {
  private constructQueryAsync(
    getAllServiceMethod: ReturnType<typeof GetAll>,
    appStore: AppStore,
    queryClient: QueryClient,
  ): IActiveTodoService['getAll']['queryAsync'] {
    return async (props) => {
      if (props?.forceRefetch) {
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
    };
  }

  private constructUseQuery({
    getAllServiceMethod,
  }: {
    getAllServiceMethod: ReturnType<typeof GetAll>;
  }): IActiveTodoService['getAll']['useQuery'] {
    return (props) => {
      const query = useQuery({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
        queryFn: getAllServiceMethod,
        enabled: props?.enabled,
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

  @Provides()
  getAllImpl(
    appStore: AppStore,
    queryClient: QueryClient,
  ): IActiveTodoService['getAll'] {
    const getAllServiceMethod = GetAll(getTodoList, (activeTodos) =>
      appStore.dispatch(saveAllActiveTodos(activeTodos)),
    );

    return {
      queryAsync: this.constructQueryAsync(
        getAllServiceMethod,
        appStore,
        queryClient,
      ),
      useQuery: this.constructUseQuery({
        getAllServiceMethod,
      }),
      errorHelpers: {},
    };
  }
}
