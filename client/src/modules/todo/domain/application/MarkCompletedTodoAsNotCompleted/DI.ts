import { useMemo } from 'react';
import { MarkCompletedTodoAsNotCompleted } from '.';
import { useTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';

export const useMarkCompletedTodoAsNotComplete = () => {
  const todoRepository = useTodoRepository();

  return useMemo(
    () => new MarkCompletedTodoAsNotCompleted(todoRepository),
    [todoRepository],
  );
};
