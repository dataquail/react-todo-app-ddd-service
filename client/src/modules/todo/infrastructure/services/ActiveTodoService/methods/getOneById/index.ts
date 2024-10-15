import { AppStore } from 'src/lib/store';
import { mapTodoDtoToActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { saveActiveTodo } from '../../activeTodoStore';
import { IGetActiveTodo } from './types';

export const GetOneById =
  (getActiveTodo: IGetActiveTodo, appStore: AppStore) =>
  async (activeTodoId: string) => {
    const activeTodoDto = await getActiveTodo(activeTodoId);

    appStore.dispatch(saveActiveTodo(mapTodoDtoToActiveTodo(activeTodoDto)));
  };
