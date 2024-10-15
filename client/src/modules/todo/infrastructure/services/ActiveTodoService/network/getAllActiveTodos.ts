import { getConfig } from 'src/utils/getConfig';
import { TodoListDto } from 'src/modules/todo/domain/dtos/TodoListDto';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { IGetAllActiveTodos } from '../methods/getAll/types';

export const getTodoList: IGetAllActiveTodos = async () => {
  return wrappedFetch<TodoListDto>(`${getConfig().API_URL}/todo`);
};
