import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { SaveForLaterBody } from 'src/modules/todo/domain/dtos/SaveForLaterBody';

export type ISaveActiveTodoForLater = (
  args: SaveForLaterBody,
) => Promise<{ id: string }>;

export const saveActiveTodoForLater: ISaveActiveTodoForLater = async (
  savedForLaterBody,
) => {
  return wrappedFetch<{ id: string }>(
    `${getConfig().API_URL}/saved-for-later-todo/save-for-later`,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(savedForLaterBody),
    },
  );
};
