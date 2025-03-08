import { QueryClient, useQuery } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { getSavedForLaterTodoList } from '../network/getAllSavedForLaterTodos';
import { mapSavedForLaterTodoDtoToSavedForLaterTodo } from 'src/modules/todo/domain/SavedForLaterTodo';

export const GetAllMethodImpl = (
  queryClient: QueryClient,
): ISavedForLaterTodoService['getAll'] => {
  const promise = async () => {
    const savedForLaterTodoListDto = await getSavedForLaterTodoList();
    return savedForLaterTodoListDto.list.map(
      mapSavedForLaterTodoDtoToSavedForLaterTodo,
    );
  };

  return {
    queryAsync: async (props) => {
      if (props?.forceRefetch) {
        await queryClient.invalidateQueries({
          queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
        });
      }
      return queryClient.fetchQuery({
        queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
        queryFn: promise,
      });
    },
    useQuery: (props) => {
      return useQuery({
        queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
        queryFn: promise,
        enabled: props?.enabled,
      });
    },
    errorHelpers: {},
  };
};
