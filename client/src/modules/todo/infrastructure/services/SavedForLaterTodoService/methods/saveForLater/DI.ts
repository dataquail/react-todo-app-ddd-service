import { QueryClient, useMutation } from '@tanstack/react-query';
import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { ApplicationGraph } from 'src/global/ApplicationGraph';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { SaveForLater } from '.';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { saveActiveTodoForLater } from '../../network/saveActiveTodoForLater';
import { SaveForLaterBody } from 'src/modules/todo/domain/dtos/SaveForLaterBody';

@Graph({ subgraphs: [ApplicationGraph] })
export class SaveForLaterMethod extends ObjectGraph {
  @Provides()
  saveForLaterImpl(
    queryClient: QueryClient,
  ): ISavedForLaterTodoService['saveForLater'] {
    const saveForLaterServiceMethod = SaveForLater(saveActiveTodoForLater);

    const mutationFn = async (saveForLaterBody: SaveForLaterBody) => {
      const result = await saveForLaterServiceMethod(saveForLaterBody);
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO, result.id],
      });
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO, saveForLaterBody.activeTodoId],
      });
      return result;
    };

    const useMutationHook = () => {
      return useMutation({
        mutationKey: [networkQueryKeys.SAVE_FOR_LATER],
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
