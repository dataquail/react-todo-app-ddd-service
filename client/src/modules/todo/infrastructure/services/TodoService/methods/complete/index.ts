import { ITodoService } from 'src/modules/todo/domain/services/ITodoService';
import { ICompleteTodo } from 'src/modules/todo/infrastructure/services/TodoService/network/completeTodo';

export const Complete =
  (completeTodo: ICompleteTodo): ITodoService['complete'] =>
  async (todoId) =>
    completeTodo(todoId);
