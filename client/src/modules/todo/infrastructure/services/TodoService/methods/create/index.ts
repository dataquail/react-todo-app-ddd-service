import { ICreateTodo } from 'src/modules/todo/infrastructure/services/TodoService/network/createTodo';
import { ITodoService } from 'src/modules/todo/domain/services/ITodoService';
import { ITodoStore } from '../../store/types';

export const Create =
  (createTodo: ICreateTodo, todoStore: ITodoStore): ITodoService['create'] =>
  async (createTodoBody) => {
    const { id } = await createTodo(createTodoBody);
    todoStore.save({ id, isFavorited: false });
  };
