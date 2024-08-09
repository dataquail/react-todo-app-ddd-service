import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Create } from '.';
import { serviceQueryKeys } from 'src/modules/todo/domain/services/serviceQueryKeys';
import { useMutationCreateTodo } from '../../network/createTodo';

const useCreateServiceMethod = () => {
  const { mutateAsync } = useMutationCreateTodo();
  return useMemo(() => Create(mutateAsync), [mutateAsync]);
};

export const useMutationCreate = () => {
  const queryClient = useQueryClient();
  const create = useCreateServiceMethod();

  return useMutation({
    mutationKey: [serviceQueryKeys.TODO_CREATE],
    mutationFn: create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [serviceQueryKeys.TODO_GET_ALL],
      });
    },
  });
};
