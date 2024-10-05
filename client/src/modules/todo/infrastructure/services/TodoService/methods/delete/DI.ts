import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceQueryKeys } from 'src/modules/todo/domain/services/serviceQueryKeys';
import { useMutationDeleteTodo } from 'src/modules/todo/infrastructure/services/TodoService/network/deleteTodo';
import { todoStore } from '../../store';
import { Delete } from '.';

const useDeleteServiceMethod = () => {
  const { mutateAsync } = useMutationDeleteTodo();
  return useMemo(() => Delete(mutateAsync, todoStore), [mutateAsync]);
};

export const useMutationDelete = () => {
  const queryClient = useQueryClient();
  const deleteTodo = useDeleteServiceMethod();

  return useMutation({
    mutationKey: [serviceQueryKeys.TODO_DELETE],
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [serviceQueryKeys.TODO_GET_ALL],
      });
    },
  });
};
