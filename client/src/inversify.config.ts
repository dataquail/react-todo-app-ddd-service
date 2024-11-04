import { appContainer } from 'src/modules/global/appContainer';
import { GLOBAL_TYPES } from 'src/modules/global/types';
import { IAppStore } from 'src/modules/global/appStore/IAppStore';
import { AppStoreImpl } from 'src/modules/global/appStore/AppStoreImpl';
import { IQueryClient } from 'src/modules/global/queryClient/IQueryClient';
import { QueryClientImpl } from 'src/modules/global/queryClient/QueryClientImpl';
import { TODO_SERVICE_TYPES } from 'src/modules/todo/domain/services/types';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { ActiveTodoServiceImpl } from 'src/modules/todo/infrastructure/services/ActiveTodoService/ActiveTodoServiceImpl';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { SavedForLaterTodoServiceImpl } from 'src/modules/todo/infrastructure/services/SavedForLaterTodoService/SavedForLaterTodoServiceImpl';

/**
 * Inversify container configuration.
 *
 * Binds all dependencies to their respective implementations.
 */

// GLOBAL DEPENDENCIES
appContainer
  .bind<IAppStore>(GLOBAL_TYPES.AppStore)
  .to(AppStoreImpl)
  .inSingletonScope();
appContainer
  .bind<IQueryClient>(GLOBAL_TYPES.QueryClient)
  .to(QueryClientImpl)
  .inSingletonScope();

// SERVICES
appContainer
  .bind<IActiveTodoService>(TODO_SERVICE_TYPES.ActiveTodoService)
  .to(ActiveTodoServiceImpl);
appContainer
  .bind<ISavedForLaterTodoService>(TODO_SERVICE_TYPES.SavedForLaterTodoService)
  .to(SavedForLaterTodoServiceImpl);
