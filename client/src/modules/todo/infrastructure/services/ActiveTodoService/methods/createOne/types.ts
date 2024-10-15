import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';

export type ICreateActiveTodo = (
  createTodoBody: CreateTodoBody,
) => Promise<{ id: string }>;
