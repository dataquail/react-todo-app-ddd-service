import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { Prioritize } from '.';
import { IAppStore } from 'src/modules/global/appStore/IAppStore';

export const PrioritizeMethodImpl = (
  appStore: IAppStore,
): IActiveTodoService['prioritize'] => {
  return Prioritize(appStore);
};
