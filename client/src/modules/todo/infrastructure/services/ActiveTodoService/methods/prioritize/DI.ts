import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { Prioritize } from '.';
import { AppStore } from 'src/lib/store';

export const PrioritizeMethodImpl = (
  appStore: AppStore,
): IActiveTodoService['prioritize'] => {
  return Prioritize(appStore);
};
