import { SaveForLaterBody } from 'src/modules/todo/domain/dtos/SaveForLaterBody';
import { ISaveActiveTodoForLater } from './types';

export const SaveForLater =
  (saveActiveTodoForLater: ISaveActiveTodoForLater) =>
  async (saveForLaterBody: SaveForLaterBody) => {
    return saveActiveTodoForLater(saveForLaterBody);
  };
