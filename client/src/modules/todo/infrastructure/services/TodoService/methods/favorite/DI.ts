import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Favorite } from '.';
import { serviceQueryKeys } from 'src/modules/todo/domain/services/serviceQueryKeys';
import { todoStore } from '../../store';

const favorite = Favorite(todoStore);

export const useMutationFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [serviceQueryKeys.TODO_FAVORITE],
    mutationFn: favorite,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [serviceQueryKeys.TODO_GET_ALL],
      });
    },
  });
};
