import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';

export type IGetActiveTodo = (activeTodoId: string) => Promise<TodoDto>;

export const getActiveTodo: IGetActiveTodo = async (todoId: string) => {
  return wrappedFetch<TodoDto>(`${getConfig().API_URL}/active-todo/${todoId}`);
};
