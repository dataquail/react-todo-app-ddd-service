import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { ICompleteActiveTodo } from '../methods/complete/types';

export const completeActiveTodo: ICompleteActiveTodo = async (todoId) => {
  return wrappedFetch<void>(`${getConfig().API_URL}/todo/${todoId}/complete`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
