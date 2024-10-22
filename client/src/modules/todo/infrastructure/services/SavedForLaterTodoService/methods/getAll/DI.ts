import { Graph, Provides, ObjectGraph } from 'react-obsidian';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { ApplicationGraph } from 'src/global/ApplicationGraph';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { getSavedForLaterTodoList } from '../../network/getAllSavedForLaterTodos';
import { GetAll } from '.';

@Graph({ subgraphs: [ApplicationGraph] })
export class GetAllMethod extends ObjectGraph {
  private constructQueryAsync(
    getAllServiceMethod: ReturnType<typeof GetAll>,
    queryClient: QueryClient,
  ): ISavedForLaterTodoService['getAll']['queryAsync'] {
    return async (props) => {
      if (props?.forceRefetch) {
        await queryClient.invalidateQueries({
          queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
        });
      }
      return queryClient.fetchQuery({
        queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
        queryFn: getAllServiceMethod,
      });
    };
  }

  private constructUseQuery({
    getAllServiceMethod,
  }: {
    getAllServiceMethod: ReturnType<typeof GetAll>;
  }): ISavedForLaterTodoService['getAll']['useQuery'] {
    return (props) => {
      return useQuery({
        queryKey: [networkQueryKeys.GET_SAVED_FOR_LATER_TODO_LIST],
        queryFn: getAllServiceMethod,
        enabled: props?.enabled,
      });
    };
  }

  @Provides()
  getAllImpl(queryClient: QueryClient): ISavedForLaterTodoService['getAll'] {
    const getAllServiceMethod = GetAll(getSavedForLaterTodoList);

    return {
      queryAsync: this.constructQueryAsync(getAllServiceMethod, queryClient),
      useQuery: this.constructUseQuery({
        getAllServiceMethod,
      }),
      errorHelpers: {},
    };
  }
}
