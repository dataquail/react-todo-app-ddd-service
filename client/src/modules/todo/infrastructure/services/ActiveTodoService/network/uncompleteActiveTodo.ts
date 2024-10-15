import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { IUncompleteActiveTodo } from '../methods/uncomplete/types';

export const uncompleteActiveTodo: IUncompleteActiveTodo = async (todoId) => {
  return wrappedFetch<void>(
    `${getConfig().API_URL}/todo/${todoId}/uncomplete`,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};
