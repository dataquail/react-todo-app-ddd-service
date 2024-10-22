import { SavedForLaterTodoDto } from 'src/modules/todo/domain/dtos/SavedForLaterTodoDto';

export type IGetSavedForLaterTodo = (args: {
  savedForLaterTodoId: string;
}) => Promise<SavedForLaterTodoDto>;
