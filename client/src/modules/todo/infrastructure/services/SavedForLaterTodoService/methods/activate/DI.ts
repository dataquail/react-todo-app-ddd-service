import { QueryClient, useMutation } from '@tanstack/react-query';
import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { ApplicationGraph } from 'src/global/ApplicationGraph';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { Activate } from '.';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { ActivateBody } from 'src/modules/todo/domain/dtos/ActivateBody';
import { activate } from '../../network/activate';

@Graph({ subgraphs: [ApplicationGraph] })
export class ActivateMethod extends ObjectGraph {
  @Provides()
  activateImpl(
    queryClient: QueryClient,
  ): ISavedForLaterTodoService['activate'] {
    const activateServiceMethod = Activate(activate);

    const mutationFn = async (activateBody: ActivateBody) => {
      const result = await activateServiceMethod(activateBody);
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
          activateBody.savedForLaterTodoId,
        ],
      });
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_TODO, result.id],
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
