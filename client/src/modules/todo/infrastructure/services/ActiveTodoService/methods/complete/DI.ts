import { QueryClient, useMutation } from '@tanstack/react-query';
import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { ApplicationGraph } from 'src/api/global/ApplicationGraph';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { CompleteOne } from '.';
import { completeActiveTodo } from '../../network/completeActiveTodo';

@Graph({ subgraphs: [ApplicationGraph] })
export class CompleteOneMethod extends ObjectGraph {
  @Provides()
  completeOneImpl(queryClient: QueryClient): IActiveTodoService['completeOne'] {
    const completeOneServiceMethod = CompleteOne(completeActiveTodo);

    const mutationFn = async (activeTodoId: string) => {
      const result = await completeOneServiceMethod(activeTodoId);
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
        mutationKey: [networkQueryKeys.COMPLETE_TODO],
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
