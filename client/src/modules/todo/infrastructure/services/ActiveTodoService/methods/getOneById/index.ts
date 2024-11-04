import {
  ActiveTodo,
  mapTodoDtoToActiveTodo,
} from 'src/modules/todo/domain/ActiveTodo';
import { IGetActiveTodo } from './types';

export const GetOneById =
  (
    getActiveTodo: IGetActiveTodo,
    saveToStore: (activeTodo: ActiveTodo) => void,
  ) =>
  async (activeTodoId: string) => {
    const activeTodoDto = await getActiveTodo(activeTodoId);
    saveToStore(mapTodoDtoToActiveTodo(activeTodoDto));
    return null;
  };
