import { ChimericMutationFactory } from 'src/utils/domain/ChimericMutation';
import { ChimericQueryFactory } from 'src/utils/domain/ChimericQuery';
import { SavedForLaterTodo } from '../SavedForLaterTodo';
import { SaveForLaterBody } from '../dtos/SaveForLaterBody';
import { ActivateBody } from '../dtos/ActivateBody';

export type ISavedForLaterTodoService = {
  getAll: ChimericQueryFactory<() => Promise<SavedForLaterTodo[]>, Error>;
  getOneById: ChimericQueryFactory<
    (args: { id: string }) => Promise<SavedForLaterTodo>,
    Error
  >;
  saveForLater: ChimericMutationFactory<
    (body: SaveForLaterBody) => Promise<{ id: string }>,
    Error
  >;
  activate: ChimericMutationFactory<
    (body: ActivateBody) => Promise<{ id: string }>,
    Error
  >;
  deleteOne: ChimericMutationFactory<
    (args: { id: string }) => Promise<void>,
    Error
  >;
};
