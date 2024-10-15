import { ReactiveMutation } from 'src/utils/domain/ReactiveMutation';
import { QueryOptions } from 'src/utils/domain/QueryOptions';
import { ActiveTodo } from '../ActiveTodo';
import { CreateTodoBody } from '../dtos/CreateTodoBody';
import { ReactiveQuery } from 'src/utils/domain/ReactiveQuery';

export type IActiveTodoService = {
  getAll: ReactiveQuery<
    (queryOptions?: QueryOptions) => Promise<ActiveTodo[]>,
    Error
  >;
  getOneById: ReactiveQuery<
    (
      id: string,
      queryOptions?: QueryOptions,
    ) => Promise<ActiveTodo | undefined>,
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
