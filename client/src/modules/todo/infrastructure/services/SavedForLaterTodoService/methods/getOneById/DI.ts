import { Graph, Provides, ObjectGraph } from 'react-obsidian';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { ApplicationGraph } from 'src/global/ApplicationGraph';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { GetOneById } from '.';
import { getSavedForLaterTodo } from '../../network/getSavedForLaterTodo';

@Graph({ subgraphs: [ApplicationGraph] })
export class GetOneByIdMethod extends ObjectGraph {
  private constructQueryAsync(
    getOneByIdServiceMethod: ReturnType<typeof GetOneById>,
    queryClient: QueryClient,
  ): ISavedForLaterTodoService['getOneById']['queryAsync'] {
    return async (props) => {
      if (props?.forceRefetch) {
        await queryClient.invalidateQueries({
          queryKey: [
            networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
            props.savedForLaterTodoId,
          ],
        });
      }
      return queryClient.fetchQuery({
        queryKey: [
          networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
          props.savedForLaterTodoId,
        ],
        queryFn: () => getOneByIdServiceMethod(props),
      });
    };
  }

  private constructUseQuery({
    getOneByIdServiceMethod,
  }: {
    getOneByIdServiceMethod: ReturnType<typeof GetOneById>;
  }): ISavedForLaterTodoService['getOneById']['useQuery'] {
    return (props) => {
      return useQuery({
        queryKey: [
          networkQueryKeys.GET_SAVED_FOR_LATER_TODO,
          props.savedForLaterTodoId,
        ],
        queryFn: () => getOneByIdServiceMethod(props),
        enabled: props?.enabled,
      });
    };
  }

  @Provides()
  getOneByIdImpl(
    queryClient: QueryClient,
  ): ISavedForLaterTodoService['getOneById'] {
    const getOneByIdServiceMethod = GetOneById(getSavedForLaterTodo);

    return {
      queryAsync: this.constructQueryAsync(
        getOneByIdServiceMethod,
        queryClient,
      ),
      useQuery: this.constructUseQuery({
        getOneByIdServiceMethod,
      }),
      errorHelpers: {},
    };
  }
}
