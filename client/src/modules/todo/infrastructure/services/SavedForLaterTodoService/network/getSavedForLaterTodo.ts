import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';
import { SavedForLaterTodoDto } from 'src/modules/todo/domain/dtos/SavedForLaterTodoDto';

export type IGetSavedForLaterTodo = (args: {
  savedForLaterTodoId: string;
}) => Promise<SavedForLaterTodoDto>;

export const getSavedForLaterTodo: IGetSavedForLaterTodo = async (args: {
  savedForLaterTodoId: string;
}) => {
  return wrappedFetch<TodoDto>(
    `${getConfig().API_URL}/saved-for-later-todo/${args.savedForLaterTodoId}`,
  );
};
