import { useMemo } from 'react';
import { MarkTodoAsCompleted } from '.';
import { useTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';

export const useMarkTodoAsCompleted = () => {
  const todoRepository = useTodoRepository();

  return useMemo(
    () => new MarkTodoAsCompleted(todoRepository),
    [todoRepository],
  );
};
