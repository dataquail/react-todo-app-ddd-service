import { ITodoServiceReactive } from 'src/modules/todo/domain/services/ITodoService';
import { useMutationCreate } from './methods/create/DI';
import { useGetAll, useQueryGetAll } from './methods/getAll/DI';
import { useMutationDelete } from './methods/delete/DI';
import { useMutationComplete } from './methods/complete/DI';
import { useMutationUncomplete } from './methods/uncomplete/DI';

const useQueryEnabledGetAll = () => useQueryGetAll(true);

export const useTodoService = (): ITodoServiceReactive => {
  return {
    create: useMutationCreate(),
    delete: useMutationDelete(),
    complete: useMutationComplete(),
    uncomplete: useMutationUncomplete(),
    getAll: {
      queryAsync: useGetAll(),
      meta: useQueryGetAll(false),
      useQuery: useQueryEnabledGetAll,
    },
  };
};
