import { QueryClient, useMutation } from '@tanstack/react-query';
import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { ApplicationGraph } from 'src/api/global/ApplicationGraph';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { UncompleteOne } from '.';
import { uncompleteActiveTodo } from '../../network/uncompleteActiveTodo';

@Graph({ subgraphs: [ApplicationGraph] })
export class UncompleteOneMethod extends ObjectGraph {
  @Provides()
  uncompleteOneImpl(
    queryClient: QueryClient,
  ): IActiveTodoService['uncompleteOne'] {
    const uncompleteOneServiceMethod = UncompleteOne(uncompleteActiveTodo);

    const mutationFn = async (activeTodoId: string) => {
      const result = await uncompleteOneServiceMethod(activeTodoId);
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO, activeTodoId],
      });
      return result;
    };

    const useMutationHook = () => {
      return useMutation({
        mutationKey: [networkQueryKeys.UNCOMPLETE_TODO],
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
