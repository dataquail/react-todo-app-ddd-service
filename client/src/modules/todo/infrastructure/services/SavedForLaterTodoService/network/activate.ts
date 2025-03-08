import { getConfig } from 'src/utils/getConfig';
import { wrappedFetch } from 'src/utils/network/wrappedFetch';
import { ActivateBody } from 'src/modules/todo/domain/dtos/ActivateBody';

export type IActivate = (args: ActivateBody) => Promise<{ id: string }>;

export const activate: IActivate = async (activateBody) => {
  return wrappedFetch<{ id: string }>(
    `${getConfig().API_URL}/saved-for-later-todo/activate`,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activateBody),
    },
  );
};
