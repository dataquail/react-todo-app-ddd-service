import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';
import { IGetSavedForLaterTodo } from '../methods/getOneById/types';

export const getSavedForLaterTodo: IGetSavedForLaterTodo = async (args: {
  savedForLaterTodoId: string;
}) => {
  return wrappedFetch<TodoDto>(
    `${getConfig().API_URL}/saved-for-later-todo/${args.savedForLaterTodoId}`,
  );
};
