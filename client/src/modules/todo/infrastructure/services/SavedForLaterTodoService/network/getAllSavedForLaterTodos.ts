import { getConfig } from 'src/utils/getConfig';
import { TodoListDto } from 'src/modules/todo/domain/dtos/TodoListDto';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { IGetAllSavedForLaterTodos } from '../methods/getAll/types';

export const getSavedForLaterTodoList: IGetAllSavedForLaterTodos = async () => {
  return wrappedFetch<TodoListDto>(
    `${getConfig().API_URL}/saved-for-later-todo`,
  );
};