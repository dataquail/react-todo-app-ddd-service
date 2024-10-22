import { IGetAllSavedForLaterTodos } from './types';
import { mapSavedForLaterTodoDtoToSavedForLaterTodo } from 'src/modules/todo/domain/SavedForLaterTodo';

export const GetAll =
  (getAllSavedForLaterTodos: IGetAllSavedForLaterTodos) => async () => {
    const savedForLaterTodoListDto = await getAllSavedForLaterTodos();
    return savedForLaterTodoListDto.list.map(
      mapSavedForLaterTodoDtoToSavedForLaterTodo,
    );
  };
