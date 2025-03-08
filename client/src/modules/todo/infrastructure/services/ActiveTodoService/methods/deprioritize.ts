import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { AppStore } from 'src/lib/store';
import { deprioritizeActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { saveActiveTodo } from '../activeTodoStore';

export const DeprioritizeMethodImpl = (
  appStore: AppStore,
): IActiveTodoService['deprioritize'] => {
  return (activeTodoId: string) => {
    const activeTodo = appStore.getState().todo.activeTodos.dict[activeTodoId];

    if (!activeTodo) {
      throw new Error('ActiveTodo not found');
    }

    const deprioritizedActiveTodo = deprioritizeActiveTodo(activeTodo);

    appStore.dispatch(saveActiveTodo(deprioritizedActiveTodo));
  };
};
