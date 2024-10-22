import { SavedForLaterTodoListDto } from 'src/modules/todo/domain/dtos/SavedForLaterTodoListDto';

export type IGetAllSavedForLaterTodos = () => Promise<SavedForLaterTodoListDto>;
