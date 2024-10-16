import {
  ActiveTodo,
  mapTodoDtoToActiveTodo,
} from 'src/modules/todo/domain/ActiveTodo';
import { IGetAllActiveTodos } from './types';

export const GetAll =
  (
    getAllActiveTodos: IGetAllActiveTodos,
    saveToStore: (activeTodos: ActiveTodo[]) => void,
  ) =>
  async () => {
    const todoListDto = await getAllActiveTodos();
    const activeTodos = todoListDto.list.map(mapTodoDtoToActiveTodo);
    saveToStore(activeTodos);
    return null;
  };
