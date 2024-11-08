import { appContainer } from 'src/modules/global/appContainer';
import { GLOBAL_TYPES } from 'src/modules/global/types';
import { IAppStoreProvider } from 'src/modules/global/appStoreProvider/IAppStoreProvider';
import { AppStoreProviderImpl } from 'src/modules/global/appStoreProvider/AppStoreProviderImpl';
import { IQueryClientProvider } from 'src/modules/global/queryClientProvider/IQueryClientProvider';
import { QueryClientProviderImpl } from 'src/modules/global/queryClientProvider/QueryClientProviderImpl';
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
  .bind<IAppStoreProvider>(GLOBAL_TYPES.AppStoreProvider)
  .to(AppStoreProviderImpl)
  .inSingletonScope();
appContainer
  .bind<IQueryClientProvider>(GLOBAL_TYPES.QueryClientProvider)
  .to(QueryClientProviderImpl)
  .inSingletonScope();

// SERVICES
appContainer
  .bind<IActiveTodoService>(TODO_SERVICE_TYPES.ActiveTodoService)
  .to(ActiveTodoServiceImpl);
appContainer
  .bind<ISavedForLaterTodoService>(TODO_SERVICE_TYPES.SavedForLaterTodoService)
  .to(SavedForLaterTodoServiceImpl);
