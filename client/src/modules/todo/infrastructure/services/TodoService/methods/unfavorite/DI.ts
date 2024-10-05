import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Unfavorite } from '.';
import { serviceQueryKeys } from 'src/modules/todo/domain/services/serviceQueryKeys';
import { todoStore } from '../../store';

const unfavorite = Unfavorite(todoStore);

export const useMutationUnfavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [serviceQueryKeys.TODO_UNFAVORITE],
    mutationFn: unfavorite,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [serviceQueryKeys.TODO_GET_ALL],
      });
    },
  });
};
