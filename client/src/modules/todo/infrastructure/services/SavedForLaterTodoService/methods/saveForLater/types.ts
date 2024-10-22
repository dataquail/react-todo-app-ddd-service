import { SaveForLaterBody } from 'src/modules/todo/domain/dtos/SaveForLaterBody';

export type ISaveActiveTodoForLater = (
  args: SaveForLaterBody,
) => Promise<{ id: string }>;
