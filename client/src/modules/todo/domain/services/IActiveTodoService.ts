import { ReactiveMutation } from 'src/utils/domain/ReactiveMutation';
import { ReactiveQuery } from 'src/utils/domain/ReactiveQuery';
import { ActiveTodo } from '../ActiveTodo';
import { CreateTodoBody } from '../dtos/CreateTodoBody';

export type IActiveTodoService = {
  getAll: ReactiveQuery<() => Promise<ActiveTodo[]>, Error>;
  getOneById: ReactiveQuery<
    (args: { activeTodoId: string }) => Promise<ActiveTodo | undefined>,
    Error
  >;
  createOne: ReactiveMutation<
    (createTodoBody: CreateTodoBody) => Promise<{ id: string }>,
    Error
  >;
  deleteOne: ReactiveMutation<(id: string) => Promise<void>, Error>;
  completeOne: ReactiveMutation<(id: string) => Promise<void>, Error>;
  uncompleteOne: ReactiveMutation<(id: string) => Promise<void>, Error>;
  prioritize: (id: string) => void;
  deprioritize: (id: string) => void;
  clearAll: () => void;
};
