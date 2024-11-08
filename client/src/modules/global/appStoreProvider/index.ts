import { appContainer } from 'src/modules/global/appContainer';
import { IAppStoreProvider } from 'src/modules/global/appStoreProvider/IAppStoreProvider';
import { GLOBAL_TYPES } from 'src/modules/global/types';

export const getAppStoreProvider = () =>
  appContainer.get<IAppStoreProvider>(GLOBAL_TYPES.AppStoreProvider);
