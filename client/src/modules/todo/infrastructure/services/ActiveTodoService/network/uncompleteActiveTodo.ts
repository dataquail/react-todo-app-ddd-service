import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type IUncompleteActiveTodo = (activeTodoId: string) => Promise<void>;

export const uncompleteActiveTodo: IUncompleteActiveTodo = async (todoId) => {
  return wrappedFetch<void>(
    `${getConfig().API_URL}/active-todo/${todoId}/uncomplete`,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};
