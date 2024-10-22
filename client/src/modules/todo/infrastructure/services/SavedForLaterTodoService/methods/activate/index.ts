import { IActivate } from './types';
import { ActivateBody } from 'src/modules/todo/domain/dtos/ActivateBody';

export const Activate =
  (activate: IActivate) => async (activateBody: ActivateBody) => {
    return activate(activateBody);
  };
