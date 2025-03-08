import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';

export type ICreateActiveTodo = (
  createTodoBody: CreateTodoBody,
) => Promise<{ id: string }>;

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
