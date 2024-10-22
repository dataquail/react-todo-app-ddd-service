import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { ISaveActiveTodoForLater } from '../methods/saveForLater/types';

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
