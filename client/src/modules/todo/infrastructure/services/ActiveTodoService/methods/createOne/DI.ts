import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateOne } from '.';
import { createActiveTodo } from '../../network/createActiveTodo';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';

const createOneServiceMethod = CreateOne(createActiveTodo);

export const useMutationCreateOne = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [networkQueryKeys.CREATE_TODO],
    mutationFn: createOneServiceMethod,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
    },
  });

  return {
    ...mutation,
    errorHelpers: {},
  };
};
