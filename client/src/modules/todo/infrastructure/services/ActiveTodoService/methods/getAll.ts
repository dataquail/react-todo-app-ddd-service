import { QueryClient, queryOptions } from '@tanstack/react-query';
import { useMemo } from 'react';
import { AppStore, useAppSelector } from 'src/lib/store';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import {
  ActiveTodo,
  mapTodoDtoToActiveTodo,
} from 'src/modules/todo/domain/ActiveTodo';
import { saveAllActiveTodos } from '../activeTodoStore';
import { MakeChimericQueryWithManagedStore } from 'src/utils/domain/makeChimericQueryWithManagedStore';
import { getConfig } from 'src/utils/getConfig';
import { TodoListDto } from 'src/modules/todo/domain/dtos/TodoListDto';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type IGetAllActiveTodos = () => Promise<TodoListDto>;

export const getTodoList: IGetAllActiveTodos = async () => {
  return wrappedFetch<TodoListDto>(`${getConfig().API_URL}/active-todo`);
};

export const getQueryOptionsGetAll = () =>
  queryOptions({
    queryKey: ['GET_TODO_LIST'],
  });

export const GetAllMethodImpl = (
  appStore: AppStore,
  queryClient: QueryClient,
): IActiveTodoService['getAll'] => {
  return MakeChimericQueryWithManagedStore(queryClient)({
    getQueryOptions: () =>
      queryOptions({
        ...getQueryOptionsGetAll(),
        queryFn: async () => {
          const todoListDto = await getTodoList();
          appStore.dispatch(
            saveAllActiveTodos(todoListDto.list.map(mapTodoDtoToActiveTodo)),
          );
        },
      }),
    errorHelpers: {},
    getFromStore: () =>
      Object.values(appStore.getState().todo.activeTodos.dict).filter(
        Boolean,
      ) as ActiveTodo[],
    useFromStore: () => {
      const activeTodoListDictionary = useAppSelector(
        (state) => state.todo.activeTodos.dict,
      );
      return useMemo(
        () =>
          Object.values(activeTodoListDictionary).filter(
            Boolean,
          ) as ActiveTodo[],
        [activeTodoListDictionary],
      );
    },
  });
};
