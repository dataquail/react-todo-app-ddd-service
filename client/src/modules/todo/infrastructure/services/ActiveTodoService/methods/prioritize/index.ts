import { saveActiveTodo } from '../../activeTodoStore';
import { prioritizeActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { AppStore } from 'src/lib/store';

export const Prioritize = (appStore: AppStore) => (activeTodoId: string) => {
  const activeTodo = appStore.getState().todo.activeTodos.dict[activeTodoId];

  if (!activeTodo) {
    throw new Error('ActiveTodo not found');
  }

  const prioritizedActiveTodo = prioritizeActiveTodo(activeTodo);

  appStore.dispatch(saveActiveTodo(prioritizedActiveTodo));
};
