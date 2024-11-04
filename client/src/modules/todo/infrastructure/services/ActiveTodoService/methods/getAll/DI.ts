import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useAppSelector } from 'src/lib/store';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { ActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { saveAllActiveTodos } from '../../activeTodoStore';
import { getTodoList } from '../../network/getAllActiveTodos';
import { GetAll } from '.';
import { IAppStore } from 'src/modules/global/appStore/IAppStore';
import { IQueryClient } from 'src/modules/global/queryClient/IQueryClient';

export const GetAllMethodImpl = (
  appStore: IAppStore,
  queryClient: IQueryClient,
): IActiveTodoService['getAll'] => {
  const getAllServiceMethod = GetAll(getTodoList, (activeTodos) =>
    appStore.dispatch(saveAllActiveTodos(activeTodos)),
  );

  return {
    queryAsync: async (props) => {
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
    },
    useQuery: (props) => {
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
    },
    errorHelpers: {},
  };
};
