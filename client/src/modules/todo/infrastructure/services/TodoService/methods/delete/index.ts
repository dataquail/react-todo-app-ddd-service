import { ITodoService } from 'src/modules/todo/domain/services/ITodoService';
import { IDeleteTodo } from 'src/modules/todo/infrastructure/services/TodoService/network/deleteTodo';
import { ITodoStore } from '../../store/types';

export const Delete =
  (deleteTodo: IDeleteTodo, todoStore: ITodoStore): ITodoService['delete'] =>
  async (todoId) => {
    await deleteTodo(todoId);
    todoStore.delete(todoId);
  };
