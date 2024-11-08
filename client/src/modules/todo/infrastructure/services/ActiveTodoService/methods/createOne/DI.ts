import { QueryClient, useMutation } from '@tanstack/react-query';
import { CreateOne } from '.';
import { createActiveTodo } from '../../network/createActiveTodo';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';

export const CreateOneMethodImpl = (queryClient: QueryClient) => {
  const createOneServiceMethod = CreateOne(createActiveTodo);

  const mutationFn = async (createTodoBody: CreateTodoBody) => {
    const result = await createOneServiceMethod(createTodoBody);
    await queryClient.invalidateQueries({
      queryKey: [networkQueryKeys.GET_TODO_LIST],
    });
    return result;
  };

  return {
    mutateAsync: mutationFn,
    useMutation: () => {
      return useMutation({
        mutationKey: [networkQueryKeys.CREATE_TODO],
        mutationFn,
      });
    },
    errorHelpers: {},
  };
};
