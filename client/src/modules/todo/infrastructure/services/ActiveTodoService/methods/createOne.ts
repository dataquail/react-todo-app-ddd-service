import { QueryClient } from '@tanstack/react-query';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { makeChimericMutation } from 'src/utils/domain/makeChimericMutation';
import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';
import { getQueryOptionsGetAll } from './getAll';

export type ICreateActiveTodo = (
  createTodoBody: CreateTodoBody,
) => Promise<{ id: string }>;

export const createActiveTodo: ICreateActiveTodo = async (createTodoBody) => {
  return wrappedFetch<{ id: string }>(`${getConfig().API_URL}/active-todo`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createTodoBody),
  });
};

export const CreateOneMethodImpl = (
  queryClient: QueryClient,
): IActiveTodoService['createOne'] => {
  return makeChimericMutation({
    mutationFn: createActiveTodo,
    errorHelpers: {},
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getQueryOptionsGetAll().queryKey,
      });
    },
  });
};
