import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type IDeleteActiveTodo = (activeTodoId: string) => Promise<void>;

export const deleteActiveTodo: IDeleteActiveTodo = async (todoId) => {
  return wrappedFetch<void>(`${getConfig().API_URL}/active-todo/${todoId}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
