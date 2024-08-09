import { ITodoService } from 'src/modules/todo/domain/services/ITodoService';
import { IDeleteTodo } from 'src/modules/todo/infrastructure/services/TodoService/network/deleteTodo';

export const Delete =
  (deleteTodo: IDeleteTodo): ITodoService['delete'] =>
  async (todoId) => {
    await deleteTodo(todoId);
  };
