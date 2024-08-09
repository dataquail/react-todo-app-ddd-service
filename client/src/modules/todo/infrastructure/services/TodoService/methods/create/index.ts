import { ICreateTodo } from 'src/modules/todo/infrastructure/services/TodoService/network/createTodo';
import { ITodoService } from 'src/modules/todo/domain/services/ITodoService';

export const Create =
  (createTodo: ICreateTodo): ITodoService['create'] =>
  async (createTodoBody) => {
    await createTodo(createTodoBody);
  };
