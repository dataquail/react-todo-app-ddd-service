import { QueryClient, useQuery } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { mapSavedForLaterTodoDtoToSavedForLaterTodo } from 'src/modules/todo/domain/SavedForLaterTodo';
import { getSavedForLaterTodo } from '../network/getSavedForLaterTodo';

export const GetOneByIdMethodImpl = (
  queryClient: QueryClient,
): ISavedForLaterTodoService['getOneById'] => {
  const promise = async (args: { savedForLaterTodoId: string }) => {
    const savedForLaterTodoDto = await getSavedForLaterTodo(args);
    return mapSavedForLaterTodoDtoToSavedForLaterTodo(savedForLaterTodoDto);
  };

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
        queryKey: [networkQueryKeys.GET_TODO_LIST],
        queryFn: () => promise(props),
      });
    },
    useQuery: (props) => {
      return useQuery({
        queryKey: [
          networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
          props.savedForLaterTodoId,
        ],
        queryFn: () => promise(props),
        enabled: props?.enabled,
      });
    },
    errorHelpers: {},
  };
};
