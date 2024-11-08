import { QueryClient, useQuery } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { GetOneById } from '.';
import { getSavedForLaterTodo } from '../../network/getSavedForLaterTodo';

export const GetOneByIdMethodImpl = (
  queryClient: QueryClient,
): ISavedForLaterTodoService['getOneById'] => {
  const getOneByIdServiceMethod = GetOneById(getSavedForLaterTodo);

  return {
    queryAsync: async (props) => {
      if (props?.forceRefetch) {
        await queryClient.invalidateQueries({
          queryKey: [
            networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
            props.savedForLaterTodoId,
          ],
        });
      }
      return queryClient.fetchQuery({
        queryKey: [
          networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
          props.savedForLaterTodoId,
        ],
        queryFn: () => getOneByIdServiceMethod(props),
      });
    },
    useQuery: (props) => {
      return useQuery({
        queryKey: [
          networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
          props.savedForLaterTodoId,
        ],
        queryFn: () => getOneByIdServiceMethod(props),
        enabled: props?.enabled,
      });
    },
    errorHelpers: {},
  };
};
