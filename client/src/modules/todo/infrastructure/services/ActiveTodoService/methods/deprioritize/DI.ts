import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { Deprioritize } from '.';
import { IAppStore } from 'src/modules/global/appStore/IAppStore';

export const DeprioritizeMethodImpl = (
  appStore: IAppStore,
): IActiveTodoService['deprioritize'] => {
  return Deprioritize(appStore);
};
