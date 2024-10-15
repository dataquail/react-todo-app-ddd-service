import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppStore } from 'src/lib/store';
import { useMemo } from 'react';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { DeleteOne } from '.';
import { deleteActiveTodo } from '../../network/deleteActiveTodo';

const useDeleteOneServiceMethod = () => {
  const appStore = useAppStore();
  return useMemo(() => DeleteOne(deleteActiveTodo, appStore), [appStore]);
};

export const useMutationDeleteOne = () => {
  const deleteOneServiceMethod = useDeleteOneServiceMethod();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [networkQueryKeys.DELETE_TODO],
    mutationFn: deleteOneServiceMethod,
    onSuccess: async (_data, activeTodoId) => {
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
      });
    },
  });

  return {
    ...mutation,
    errorHelpers: {},
  };
};
