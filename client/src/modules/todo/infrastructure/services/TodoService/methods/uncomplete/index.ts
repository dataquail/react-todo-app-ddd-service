import { ITodoService } from 'src/modules/todo/domain/services/ITodoService';
import { IUncompleteTodo } from 'src/modules/todo/infrastructure/services/TodoService/network/uncompleteTodo';

export const Uncomplete =
  (uncompleteTodo: IUncompleteTodo): ITodoService['uncomplete'] =>
  async (todoId) =>
    uncompleteTodo(todoId);
