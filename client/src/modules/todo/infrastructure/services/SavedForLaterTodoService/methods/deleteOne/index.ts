import { IDeleteSavedForLaterTodo } from './types';

export const DeleteOne =
  (deleteSavedForLaterTodo: IDeleteSavedForLaterTodo) =>
  async (savedForLaterTodoId: string) => {
    return deleteSavedForLaterTodo(savedForLaterTodoId);
  };
