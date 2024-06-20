import { useMemo } from 'react';
import { TodoService } from '.';
import { useGetTodoList } from './network/getTodoList';
import { useMutationCreateTodo } from './network/createTodo';

export const useTodoService = () => {
  const getTodoList = useGetTodoList();
  const { mutateAsync: createTodo } = useMutationCreateTodo();
  return useMemo(
    () => new TodoService(getTodoList, createTodo),
    [getTodoList, createTodo],
  );
};
