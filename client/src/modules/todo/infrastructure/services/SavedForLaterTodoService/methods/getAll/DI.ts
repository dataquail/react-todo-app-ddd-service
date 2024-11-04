import { useQuery } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { getSavedForLaterTodoList } from '../../network/getAllSavedForLaterTodos';
import { GetAll } from '.';
import { IQueryClient } from 'src/modules/global/IQueryClient';

export const GetAllMethodImpl = (
  queryClient: IQueryClient,
): ISavedForLaterTodoService['getAll'] => {
  const getAllServiceMethod = GetAll(getSavedForLaterTodoList);

  return {
    queryAsync: async (props) => {
      if (props?.forceRefetch) {
        await queryClient.invalidateQueries({
          queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
        });
      }
      return queryClient.fetchQuery({
        queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
        queryFn: getAllServiceMethod,
      });
    },
    useQuery: (props) => {
      return useQuery({
        queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
        queryFn: getAllServiceMethod,
        enabled: props?.enabled,
      });
    },
    errorHelpers: {},
  };
};
