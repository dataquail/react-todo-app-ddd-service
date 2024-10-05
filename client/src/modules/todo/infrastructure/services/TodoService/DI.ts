import { ITodoServiceReactive } from 'src/modules/todo/domain/services/ITodoService';
import { useMutationCreate } from './methods/create/DI';
import { useGetAll, useQueryGetAll } from './methods/getAll/DI';
import { useMutationDelete } from './methods/delete/DI';
import { useMutationComplete } from './methods/complete/DI';
import { useMutationUncomplete } from './methods/uncomplete/DI';
import { useMutationFavorite } from './methods/favorite/DI';
import { useMutationUnfavorite } from './methods/unfavorite/DI';
import { useGetOneById, useQueryGetOneById } from './methods/getOneById/DI';

const useQueryEnabledGetAll = () => useQueryGetAll(true);
const useQueryDisabledGetAll = () => useQueryGetAll(false);
const useQueryEnabledGetOneById = (todoId: string) =>
  useQueryGetOneById(true, todoId);
const useQueryDisabledGetOneById = (todoId: string) =>
  useQueryGetOneById(false, todoId);

export const useTodoService = (): ITodoServiceReactive => {
  return {
    create: useMutationCreate(),
    delete: useMutationDelete(),
    complete: useMutationComplete(),
    uncomplete: useMutationUncomplete(),
    favorite: useMutationFavorite(),
    unfavorite: useMutationUnfavorite(),
    getAll: {
      queryAsync: useGetAll(),
      useMeta: useQueryDisabledGetAll,
      useQuery: useQueryEnabledGetAll,
    },
    getOneById: {
      queryAsync: useGetOneById(),
      useMeta: useQueryDisabledGetOneById,
      useQuery: useQueryEnabledGetOneById,
    },
  };
};
