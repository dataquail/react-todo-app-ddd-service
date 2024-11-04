import { appContainer } from 'src/modules/global/appContainer';
import { GLOBAL_TYPES } from 'src/modules/global/types';
import { IQueryClient } from 'src/modules/global/queryClient/IQueryClient';

export const queryClient = appContainer.get<IQueryClient>(
  GLOBAL_TYPES.QueryClient,
);
