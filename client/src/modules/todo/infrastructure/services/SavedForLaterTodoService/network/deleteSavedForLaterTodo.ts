import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { IDeleteSavedForLaterTodo } from '../methods/deleteOne/types';

export const deleteSavedForLaterTodo: IDeleteSavedForLaterTodo = async (
  savedForLaterTodoId,
) => {
  return wrappedFetch<void>(
    `${getConfig().API_URL}/saved-for-later-todo/${savedForLaterTodoId}`,
    {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};
