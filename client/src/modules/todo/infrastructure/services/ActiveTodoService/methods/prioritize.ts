import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { AppStore } from 'src/lib/store';
import { saveActiveTodo } from '../activeTodoStore';
import { prioritizeActiveTodo } from 'src/modules/todo/domain/ActiveTodo';

export const PrioritizeMethodImpl = (
  appStore: AppStore,
): IActiveTodoService['prioritize'] => {
  return (args: { id: string }) => {
    const activeTodo = appStore.getState().todo.activeTodos.dict[args.id];

    if (!activeTodo) {
      throw new Error('ActiveTodo not found');
    }

    const prioritizedActiveTodo = prioritizeActiveTodo(activeTodo);

    appStore.dispatch(saveActiveTodo(prioritizedActiveTodo));
  };
};
