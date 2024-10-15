import { AppStore } from 'src/lib/store';
import { IDeleteActiveTodo } from './types';
import { removeActiveTodo } from '../../activeTodoStore';

export const DeleteOne =
  (deleteActiveTodo: IDeleteActiveTodo, appStore: AppStore) =>
  async (activeTodoId: string) => {
    await deleteActiveTodo(activeTodoId);
    appStore.dispatch(removeActiveTodo(activeTodoId));
  };
