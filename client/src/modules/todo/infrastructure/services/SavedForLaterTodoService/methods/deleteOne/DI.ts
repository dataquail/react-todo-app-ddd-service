import { QueryClient, useMutation } from '@tanstack/react-query';
import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { ApplicationGraph } from 'src/global/ApplicationGraph';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { DeleteOne } from '.';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { deleteSavedForLaterTodo } from '../../network/deleteSavedForLaterTodo';

@Graph({ subgraphs: [ApplicationGraph] })
export class DeleteOneMethod extends ObjectGraph {
  @Provides()
  deleteOneImpl(
    queryClient: QueryClient,
  ): ISavedForLaterTodoService['deleteOne'] {
    const deleteOneServiceMethod = DeleteOne(deleteSavedForLaterTodo);

    const mutationFn = async (savedForLaterTodoId: string) => {
      const result = await deleteOneServiceMethod(savedForLaterTodoId);
      await queryClient.invalidateQueries({
        queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
          savedForLaterTodoId,
        ],
      });
      return result;
    };

    const useMutationHook = () => {
      return useMutation({
        mutationKey: [networkQueryKeys.DELETE_SAVED_FOR_LATER_TODO],
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
