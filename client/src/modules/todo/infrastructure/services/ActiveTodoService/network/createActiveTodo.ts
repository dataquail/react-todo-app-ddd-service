import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { ICreateActiveTodo } from '../methods/createOne/types';

export const createActiveTodo: ICreateActiveTodo = async (createTodoBody) => {
  return wrappedFetch<{ id: string }>(`${getConfig().API_URL}/active-todo`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createTodoBody),
  });
};
