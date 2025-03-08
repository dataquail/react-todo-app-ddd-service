import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';

export type IDeleteSavedForLaterTodo = (
  savedForLaterTodoId: string,
) => Promise<void>;

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
