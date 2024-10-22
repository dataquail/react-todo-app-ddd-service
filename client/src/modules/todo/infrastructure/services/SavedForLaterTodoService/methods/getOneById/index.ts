import { IGetSavedForLaterTodo } from './types';
import { mapSavedForLaterTodoDtoToSavedForLaterTodo } from 'src/modules/todo/domain/SavedForLaterTodo';

export const GetOneById =
  (getSavedForLaterTodo: IGetSavedForLaterTodo) =>
  async (args: { savedForLaterTodoId: string }) => {
    const savedForLaterTodoDto = await getSavedForLaterTodo(args);
    return mapSavedForLaterTodoDtoToSavedForLaterTodo(savedForLaterTodoDto);
  };
