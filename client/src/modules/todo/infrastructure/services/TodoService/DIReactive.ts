import { useMemo } from 'react';
import { ITodoServiceReactive } from 'src/modules/todo/domain/services/ITodoService';
import { useQueryGetTodoList } from './network/getTodoList';
import { toTodoDomain } from './utils/toTodoDomain';
import { useMutationCreateTodo } from './network/createTodo';

const useGetAll: ITodoServiceReactive['useGetAll'] = () => {
  const {
    data: todoListDto,
    isPending,
    isError,
    isSuccess,
    error,
  } = useQueryGetTodoList();

  return {
    isPending,
    isError,
    isSuccess,
    error,
    data: useMemo(() => {
      if (!todoListDto) {
        return [];
      } else {
        return todoListDto.list.map((todoDto) => toTodoDomain(todoDto));
      }
    }, [todoListDto]),
  };
};

const useCreate: ITodoServiceReactive['useCreate'] = () => {
  const {
    mutateAsync: createTodo,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutationCreateTodo();

  return {
    invoke: createTodo,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export const todoServiceReactive: ITodoServiceReactive = {
  useGetAll,
  useCreate,
};
