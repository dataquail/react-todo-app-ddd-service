import { QueryClient, queryOptions } from '@tanstack/react-query';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { mapSavedForLaterTodoDtoToSavedForLaterTodo } from 'src/modules/todo/domain/SavedForLaterTodo';
import { MakeChimericQuery } from 'src/utils/domain/makeChimericQuery';
import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';
import { SavedForLaterTodoDto } from 'src/modules/todo/domain/dtos/SavedForLaterTodoDto';

export type IGetSavedForLaterTodo = (args: {
  id: string;
}) => Promise<SavedForLaterTodoDto>;

export const getSavedForLaterTodo: IGetSavedForLaterTodo = async (args: {
  id: string;
}) => {
  return wrappedFetch<TodoDto>(
    `${getConfig().API_URL}/saved-for-later-todo/${args.id}`,
  );
};

export const getQueryOptionsGetOneById = (args: { id: string }) =>
  queryOptions({
    queryKey: ['GET_SAVED_FOR_LATER_TODO', args.id],
    queryFn: async () => {
      const savedForLaterTodoDto = await getSavedForLaterTodo(args);
      return mapSavedForLaterTodoDtoToSavedForLaterTodo(savedForLaterTodoDto);
    },
  });

export const GetOneByIdMethodImpl = (
  queryClient: QueryClient,
): ISavedForLaterTodoService['getOneById'] => {
  return MakeChimericQuery(queryClient)({
    getQueryOptions: getQueryOptionsGetOneById,
    errorHelpers: {},
  });
};
