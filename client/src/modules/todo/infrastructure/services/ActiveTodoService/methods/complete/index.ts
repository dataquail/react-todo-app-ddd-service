import { ICompleteActiveTodo } from './types';

export const CompleteOne =
  (completeActiveTodo: ICompleteActiveTodo) => async (activeTodoId: string) => {
    await completeActiveTodo(activeTodoId);
  };
