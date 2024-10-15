import { useCallback } from 'react';
import { useAppDispatch } from 'src/lib/store';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import {
  useQueryAsyncGetAll,
  useQueryGetAll,
  useMetaGetAll,
} from './methods/getAll/DI';
import {
  useMetaGetOneById,
  useQueryAsyncGetOneById,
  useQueryGetOneById,
} from './methods/getOneById/DI';
import { removeAllActiveTodos } from './activeTodoStore';
import { useMutationCreateOne } from './methods/createOne/DI';
import { useMutationDeleteOne } from './methods/deleteOne/DI';
import { useMutationCompleteOne } from './methods/complete/DI';
import { useMutationUncompleteOne } from './methods/uncomplete/DI';
import { usePrioritize } from './methods/prioritize/DI';
import { useDeprioritize } from './methods/deprioritize/DI';

export const useActiveTodoServiceDI = (): IActiveTodoService => {
  const dispatch = useAppDispatch();

  return {
    getAll: {
      queryAsync: useQueryAsyncGetAll(),
      useMeta: useMetaGetAll,
      useQuery: useQueryGetAll,
      errorHelpers: {},
    },
    getOneById: {
      queryAsync: useQueryAsyncGetOneById(),
      useMeta: useMetaGetOneById,
      useQuery: useQueryGetOneById,
      errorHelpers: {},
    },
    clearAll: useCallback(() => dispatch(removeAllActiveTodos()), [dispatch]),
    createOne: useMutationCreateOne(),
    deleteOne: useMutationDeleteOne(),
    completeOne: useMutationCompleteOne(),
    uncompleteOne: useMutationUncompleteOne(),
    prioritize: usePrioritize(),
    deprioritize: useDeprioritize(),
  };
};
