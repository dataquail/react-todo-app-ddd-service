import { IUncompleteActiveTodo } from './types';

export const UncompleteOne =
  (uncompleteActiveTodo: IUncompleteActiveTodo) =>
  async (activeTodoId: string) => {
    await uncompleteActiveTodo(activeTodoId);
  };
