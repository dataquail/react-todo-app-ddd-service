import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type ICompleteActiveTodo = (activeTodoId: string) => Promise<void>;

export const completeActiveTodo: ICompleteActiveTodo = async (todoId) => {
  return wrappedFetch<void>(
    `${getConfig().API_URL}/active-todo/${todoId}/complete`,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};
