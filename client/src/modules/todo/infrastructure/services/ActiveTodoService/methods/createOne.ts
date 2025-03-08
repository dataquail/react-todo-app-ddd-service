import { QueryClient, useMutation } from '@tanstack/react-query';
import { createActiveTodo } from '../network/createActiveTodo';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';

export const CreateOneMethodImpl = (queryClient: QueryClient) => {
  const promise = async (createTodoBody: CreateTodoBody) => {
    const result = await createActiveTodo(createTodoBody);
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO_LIST],
    });
    return result;
  };

  return {
    mutateAsync: promise,
    useMutation: () => {
      return useMutation({
        mutationKey: [networkQueryKeys.CREATE_TODO],
        mutationFn: promise,
      });
    },
    errorHelpers: {},
  };
};
