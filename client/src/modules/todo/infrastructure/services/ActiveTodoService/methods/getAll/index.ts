import { AppStore } from 'src/lib/store';
import { IGetAllActiveTodos } from './types';
import { mapTodoDtoToActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { saveAllActiveTodos } from '../../activeTodoStore';

export const GetAll =
  (getAllActiveTodos: IGetAllActiveTodos, appStore: AppStore) => async () => {
    const todoListDto = await getAllActiveTodos();

    const activeTodos = todoListDto.list.map(mapTodoDtoToActiveTodo);

    appStore.dispatch(saveAllActiveTodos(activeTodos));
  };
