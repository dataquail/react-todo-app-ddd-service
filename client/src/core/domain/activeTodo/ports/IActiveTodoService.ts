import { ChimericMutationFactory } from 'src/utils/domain/ChimericMutation';
import { ChimericQueryFactory } from 'src/utils/domain/ChimericQuery';
import { ActiveTodo } from 'src/core/domain/ActiveTodos/entities/ActiveTodo';
import { CreateTodoBody } from '../dtos/in/CreateTodoBody';

export type IActiveTodoService = {
  getAll: ChimericQueryFactory<() => Promise<ActiveTodo[]>, Error>;
  getOneById: ChimericQueryFactory<
    (args: { id: string }) => Promise<ActiveTodo>,
    Error
  >;
  createOne: ChimericMutationFactory<
    (body: CreateTodoBody) => Promise<{ id: string }>,
    Error
  >;
  deleteOne: ChimericMutationFactory<
    (args: { id: string }) => Promise<void>,
    Error
  >;
  completeOne: ChimericMutationFactory<
    (args: { id: string }) => Promise<void>,
    Error
  >;
  uncompleteOne: ChimericMutationFactory<
    (args: { id: string }) => Promise<void>,
    Error
  >;
  prioritize: (args: { id: string }) => void;
  deprioritize: (args: { id: string }) => void;
  clearAll: () => void;
};
