import { appContainer } from 'src/modules/global/appContainer';
import { IAppStore } from 'src/modules/global/appStore/IAppStore';
import { GLOBAL_TYPES } from 'src/modules/global/types';

export const appStore = appContainer.get<IAppStore>(GLOBAL_TYPES.AppStore);
