import { QueryClient, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { AppStore, useAppSelector } from 'src/lib/store';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import {
  ActiveTodo,
  mapTodoDtoToActiveTodo,
} from 'src/modules/todo/domain/ActiveTodo';
import { saveAllActiveTodos } from '../activeTodoStore';
import { getTodoList } from '../network/getAllActiveTodos';

export const GetAllMethodImpl = (
  appStore: AppStore,
  queryClient: QueryClient,
): IActiveTodoService['getAll'] => {
  const promise = async () => {
    console.log('getting todo list');
    const todoListDto = await getTodoList();
    console.log('todo list', todoListDto);
    appStore.dispatch(
      saveAllActiveTodos(todoListDto.list.map(mapTodoDtoToActiveTodo)),
    );
    return null;
  };

  return {
    queryAsync: async (props) => {
      if (props?.forceRefetch) {
        await queryClient.invalidateQueries({
          queryKey: [networkQueryKeys.GET_TODO_LIST],
        });
      }
      await queryClient.fetchQuery({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
        queryFn: promise,
      });
      return Object.values(appStore.getState().todo.activeTodos.dict).filter(
        Boolean,
      ) as ActiveTodo[];
    },
    useQuery: (props) => {
      const query = useQuery({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
        queryFn: promise,
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
    },
    errorHelpers: {},
  };
};
