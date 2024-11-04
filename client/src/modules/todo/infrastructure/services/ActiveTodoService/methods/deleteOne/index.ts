import { IDeleteActiveTodo } from './types';

export const DeleteOne =
  (
    deleteActiveTodo: IDeleteActiveTodo,
    removeActiveTodo: (activeTodoId: string) => void,
  ) =>
  async (activeTodoId: string) => {
    await deleteActiveTodo(activeTodoId);
    removeActiveTodo(activeTodoId);
  };
