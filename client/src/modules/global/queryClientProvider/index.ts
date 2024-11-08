import { appContainer } from 'src/modules/global/appContainer';
import { GLOBAL_TYPES } from 'src/modules/global/types';
import { IQueryClientProvider } from 'src/modules/global/queryClientProvider/IQueryClientProvider';

export const getQueryClientProvider = () =>
  appContainer.get<IQueryClientProvider>(GLOBAL_TYPES.QueryClientProvider);
