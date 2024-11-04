import { saveActiveTodo } from '../../activeTodoStore';
import { prioritizeActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { IAppStore } from 'src/modules/global/IAppStore';

export const Prioritize = (appStore: IAppStore) => (activeTodoId: string) => {
  const activeTodo = appStore.getState().todo.activeTodos.dict[activeTodoId];

  if (!activeTodo) {
    throw new Error('ActiveTodo not found');
  }

  const prioritizedActiveTodo = prioritizeActiveTodo(activeTodo);

  appStore.dispatch(saveActiveTodo(prioritizedActiveTodo));
};
