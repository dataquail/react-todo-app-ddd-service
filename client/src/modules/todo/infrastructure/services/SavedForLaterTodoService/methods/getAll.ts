import { QueryClient, queryOptions } from '@tanstack/react-query';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { mapSavedForLaterTodoDtoToSavedForLaterTodo } from 'src/modules/todo/domain/SavedForLaterTodo';
import { MakeChimericQuery } from 'src/utils/domain/makeChimericQuery';
import { getConfig } from 'src/utils/getConfig';
import { TodoListDto } from 'src/modules/todo/domain/dtos/TodoListDto';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { SavedForLaterTodoListDto } from 'src/modules/todo/domain/dtos/SavedForLaterTodoListDto';

export type IGetAllSavedForLaterTodos = () => Promise<SavedForLaterTodoListDto>;

export const getSavedForLaterTodoList: IGetAllSavedForLaterTodos = async () => {
  return wrappedFetch<TodoListDto>(
    `${getConfig().API_URL}/saved-for-later-todo`,
  );
};

export const getQueryOptionsGetAll = () =>
  queryOptions({
    queryKey: ['GET_SAVED_FOR_LATER_TODO_LIST'],
    queryFn: async () => {
      const savedForLaterTodoListDto = await getSavedForLaterTodoList();
      return savedForLaterTodoListDto.list.map(
        mapSavedForLaterTodoDtoToSavedForLaterTodo,
      );
    },
  });

export const GetAllMethodImpl = (
  queryClient: QueryClient,
): ISavedForLaterTodoService['getAll'] => {
  return MakeChimericQuery(queryClient)({
    getQueryOptions: getQueryOptionsGetAll,
    errorHelpers: {},
  });
};
