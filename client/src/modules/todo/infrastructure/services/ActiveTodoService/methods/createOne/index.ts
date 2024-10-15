import { ICreateActiveTodo } from './types';
import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';

export const CreateOne =
  (createActiveTodo: ICreateActiveTodo) =>
  async (createTodoBody: CreateTodoBody) => {
    return createActiveTodo(createTodoBody);
  };
