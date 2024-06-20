import { useMemo } from 'react';
import { ITodoRepository } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { useAppDispatch, useAppStore } from 'src/lib/store';
import { TodoRepositoryReduxImpl } from './reduxImpl/TodoRepositoryReduxImpl';

export const useTodoRepository = (): ITodoRepository => {
  const appStore = useAppStore();
  const appDispatch = useAppDispatch();

  return useMemo(
    () => new TodoRepositoryReduxImpl(appStore, appDispatch),
    [appStore, appDispatch],
  );
};
