import { ReactiveMutation } from 'src/utils/domain/ReactiveMutation';
import { ReactiveQuery } from 'src/utils/domain/ReactiveQuery';
import { SavedForLaterTodo } from '../SavedForLaterTodo';
import { SaveForLaterBody } from '../dtos/SaveForLaterBody';
import { ActivateBody } from '../dtos/ActivateBody';

export type ISavedForLaterTodoService = {
  getAll: ReactiveQuery<() => Promise<SavedForLaterTodo[]>, Error>;
  getOneById: ReactiveQuery<
    (args: { savedForLaterTodoId: string }) => Promise<SavedForLaterTodo>,
    Error
  >;
  saveForLater: ReactiveMutation<
    (args: SaveForLaterBody) => Promise<{ id: string }>,
    Error
  >;
  activate: ReactiveMutation<
    (args: ActivateBody) => Promise<{ id: string }>,
    Error
  >;
  deleteOne: ReactiveMutation<
    (savedForLaterTodoId: string) => Promise<void>,
    Error
  >;
};
