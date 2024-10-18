import { QueryClient, useMutation } from '@tanstack/react-query';
import { type AppStore } from 'src/lib/store';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { DeleteOne } from '.';
import { deleteActiveTodo } from '../../network/deleteActiveTodo';
import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { ApplicationGraph } from 'src/global/ApplicationGraph';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';

@Graph({ subgraphs: [ApplicationGraph] })
export class DeleteOneMethod extends ObjectGraph {
  @Provides()
  deleteOneImpl(
    queryClient: QueryClient,
    appStore: AppStore,
  ): IActiveTodoService['deleteOne'] {
    const deleteOneServiceMethod = DeleteOne(deleteActiveTodo, appStore);

    const mutationFn = async (activeTodoId: string) => {
      const result = await deleteOneServiceMethod(activeTodoId);
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
        mutationKey: [networkQueryKeys.DELETE_TODO],
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
