import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { IDeleteActiveTodo } from '../methods/deleteOne/types';

export const deleteActiveTodo: IDeleteActiveTodo = async (todoId) => {
  return wrappedFetch<void>(`${getConfig().API_URL}/todo/${todoId}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
