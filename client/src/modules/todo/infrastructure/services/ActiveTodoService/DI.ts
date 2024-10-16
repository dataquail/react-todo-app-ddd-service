import { useCallback } from 'react';
import { type AppStore, type AppDispatch } from 'src/lib/store';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import {
  useMetaGetOneById,
  useQueryAsyncGetOneById,
  useQueryGetOneById,
} from './methods/getOneById/DI';
import { removeAllActiveTodos } from './activeTodoStore';
import { useMutationDeleteOne } from './methods/deleteOne/DI';
import { useMutationCompleteOne } from './methods/complete/DI';
import { useMutationUncompleteOne } from './methods/uncomplete/DI';
import {
  DependenciesOf,
  Graph,
  injectHook,
  ObjectGraph,
  Provides,
  Singleton,
} from 'react-obsidian';
import { GetAllGraph } from './methods/getAll/DI';
import { Prioritize } from './methods/prioritize';
import { Deprioritize } from './methods/deprioritize';
import { CreateOneGraph } from './methods/createOne/DI';
import { QueryClient } from '@tanstack/react-query';

@Singleton()
@Graph({ subgraphs: [GetAllGraph] })
export class ActiveTodoService extends ObjectGraph {
  @Provides()
  getAll(
    useQueryAsyncGetAll: ReturnType<GetAllGraph['useQueryAsyncGetAll']>,
    useMetaGetAll: ReturnType<GetAllGraph['useMetaGetAll']>,
    useQueryGetAll: ReturnType<GetAllGraph['useQueryGetAll']>,
  ): IActiveTodoService['getAll'] {
    return {
      queryAsync: useQueryAsyncGetAll,
      useMeta: useMetaGetAll,
      useQuery: useQueryGetAll,
      errorHelpers: {},
    };
  }

  @Provides()
  getOneById() {
    return {
      queryAsync: useQueryAsyncGetOneById(),
      useMeta: useMetaGetOneById,
      useQuery: useQueryGetOneById,
      errorHelpers: {},
    };
  }

  @Provides()
  clearAll(appDispatch: AppDispatch) {
    return useCallback(
      () => appDispatch(removeAllActiveTodos()),
      [appDispatch],
    );
  }

  @Provides()
  createOne(queryClient: QueryClient) {
    return new CreateOneGraph(queryClient).useMutationCreateOne();
  }

  @Provides()
  deleteOne() {
    return useMutationDeleteOne();
  }

  @Provides()
  completeOne() {
    return useMutationCompleteOne();
  }

  @Provides()
  uncompleteOne() {
    return useMutationUncompleteOne();
  }

  @Provides()
  prioritize(appStore: AppStore) {
    return Prioritize(appStore);
  }

  @Provides()
  deprioritize(appStore: AppStore) {
    return Deprioritize(appStore);
  }
}

const activeTodoServiceHook = (
  injected: DependenciesOf<ActiveTodoService>,
): IActiveTodoService => injected;

export const useActiveTodoService = injectHook(
  activeTodoServiceHook,
  ActiveTodoService,
);
