import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';
import { IGetActiveTodo } from '../methods/getOneById/types';

export const getActiveTodo: IGetActiveTodo = async (todoId: string) => {
  return wrappedFetch<TodoDto>(`${getConfig().API_URL}/todo/${todoId}`);
};

// export const useQueryGetTodo = (enabled: boolean = true, todoId: string) => {
//   return useQuery({
//     queryKey: [networkQueryKeys.GET_TODO_LIST],
//     queryFn: async () => getTodo(todoId),
//     enabled,
//   });
// };

// export const useGetTodo = (): IGetTodo => {
//   const queryClient = useQueryClient();
//   return useCallback(
//     (todoId: string) => {
//       return queryClient.fetchQuery({
//         queryKey: [networkQueryKeys.GET_TODO_LIST],
//         queryFn: () => getTodo(todoId),
//       });
//     },
//     [queryClient],
//   );
// };
