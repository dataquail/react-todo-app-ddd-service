import { AppStore } from 'src/lib/store';
import { saveActiveTodo } from '../../activeTodoStore';
import { deprioritizeActiveTodo } from 'src/modules/todo/domain/ActiveTodo';

export const Deprioritize = (appStore: AppStore) => (activeTodoId: string) => {
  const activeTodo = appStore.getState().todo.activeTodos.dict[activeTodoId];

  if (!activeTodo) {
    throw new Error('ActiveTodo not found');
  }

  const deprioritizedActiveTodo = deprioritizeActiveTodo(activeTodo);

  appStore.dispatch(saveActiveTodo(deprioritizedActiveTodo));
};
