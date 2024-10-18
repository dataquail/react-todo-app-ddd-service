import { QueryClient, useMutation } from '@tanstack/react-query';
import { CreateOne } from '.';
import { createActiveTodo } from '../../network/createActiveTodo';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { ApplicationGraph } from 'src/global/ApplicationGraph';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';

@Graph({ subgraphs: [ApplicationGraph] })
export class CreateOneMethod extends ObjectGraph {
  @Provides()
  createOneImpl(queryClient: QueryClient): IActiveTodoService['createOne'] {
    const createOneServiceMethod = CreateOne(createActiveTodo);

    const mutationFn = async (createTodoBody: CreateTodoBody) => {
      const result = await createOneServiceMethod(createTodoBody);
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
      return result;
    };

    const useMutationHook = () => {
      return useMutation({
        mutationKey: [networkQueryKeys.CREATE_TODO],
        mutationFn,
      });
    };

    return {
      mutateAsync: mutationFn,
      useMutation: useMutationHook,
      errorHelpers: {},
    };
  }
}
