import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { GetOneById } from '.';
import { useAppSelector, useAppStore } from 'src/lib/store';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { QueryOptions } from 'src/utils/domain/QueryOptions';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { getActiveTodo } from '../../network/getActiveTodo';

const useGetOneById = () => {
  const appStore = useAppStore();

  return useMemo(() => GetOneById(getActiveTodo, appStore), [appStore]);
};

const getUseQueryGetOneById =
  (queryOptions: QueryOptions): IActiveTodoService['getOneById']['useQuery'] =>
  (activeTodoId: string) => {
    const getOneById = useGetOneById();
    const query = useQuery({
      queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
      queryFn: () => getOneById(activeTodoId),
      enabled: queryOptions.enabled,
    });
    const activeTodo = useAppSelector(
      (state) => state.todo.activeTodos.dict[activeTodoId],
    );

    return {
      ...query,
      data: activeTodo,
    };
  };

export const useMetaGetOneById = getUseQueryGetOneById({
  enabled: false,
});

export const useQueryGetOneById = getUseQueryGetOneById({
  enabled: true,
});

export const useQueryAsyncGetOneById =
  (): IActiveTodoService['getOneById']['queryAsync'] => {
    const getOneById = useGetOneById();
    const queryClient = useQueryClient();

    return useCallback(
      async (activeTodoId: string, queryOptions?: QueryOptions) => {
        if (queryOptions?.forceRefetch) {
          await queryClient.invalidateQueries({
            queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
          });
        }
        return queryClient.fetchQuery({
          queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
          queryFn: () => getOneById(activeTodoId),
        });
      },
      [queryClient, getOneById],
    );
  };
