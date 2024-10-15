import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { GetAll } from '.';
import { useAppSelector, useAppStore } from 'src/lib/store';
import { getTodoList } from '../../network/getAllActiveTodos';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { QueryOptions } from 'src/utils/domain/QueryOptions';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { ActiveTodo } from 'src/modules/todo/domain/ActiveTodo';

const useGetAll = () => {
  const appStore = useAppStore();

  return useMemo(() => GetAll(getTodoList, appStore), [appStore]);
};

const getUseQueryGetAll =
  (queryOptions: QueryOptions): IActiveTodoService['getAll']['useQuery'] =>
  () => {
    const getAll = useGetAll();
    const query = useQuery({
      queryKey: [networkQueryKeys.GET_TODO_LIST],
      queryFn: async () => {
        await getAll();
        return null;
      },
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

export const useMetaGetAll = getUseQueryGetAll({
  enabled: false,
});

export const useQueryGetAll = getUseQueryGetAll({
  enabled: true,
});

export const useQueryAsyncGetAll =
  (): IActiveTodoService['getAll']['queryAsync'] => {
    const getAll = useGetAll();
    const queryClient = useQueryClient();

    return useCallback(
      async (queryOptions?: QueryOptions) => {
        if (queryOptions?.forceRefetch) {
          await queryClient.invalidateQueries({
            queryKey: [networkQueryKeys.GET_TODO_LIST],
          });
        }
        return queryClient.fetchQuery({
          queryKey: [networkQueryKeys.GET_TODO_LIST],
          queryFn: getAll,
        });
      },
      [queryClient, getAll],
    );
  };
