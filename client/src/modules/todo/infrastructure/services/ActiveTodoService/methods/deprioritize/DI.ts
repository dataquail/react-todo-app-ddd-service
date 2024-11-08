import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { Deprioritize } from '.';
import { AppStore } from 'src/lib/store';

export const DeprioritizeMethodImpl = (
  appStore: AppStore,
): IActiveTodoService['deprioritize'] => {
  return Deprioritize(appStore);
};
