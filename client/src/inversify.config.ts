import { Container } from 'inversify';
import { IAppStore } from './modules/global/IAppStore';
import { GLOBAL_TYPES } from './modules/global/types';
import { AppStoreImpl } from './modules/global/AppStoreImpl';
import { IQueryClient } from './modules/global/IQueryClient';
import { QueryClientImpl } from './modules/global/QueryClientImpl';
import { IActiveTodoService } from './modules/todo/domain/services/IActiveTodoService';
import { ActiveTodoServiceImpl } from './modules/todo/infrastructure/services/ActiveTodoService/ActiveTodoServiceImpl';
import { ISavedForLaterTodoService } from './modules/todo/domain/services/ISavedForLaterTodoService';
import { SavedForLaterTodoServiceImpl } from './modules/todo/infrastructure/services/SavedForLaterTodoService/SavedForLaterTodoServiceImpl';

export const appContainer = new Container();

// Binding interfaces to implementations
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
  .bind<IActiveTodoService>(GLOBAL_TYPES.ActiveTodoService)
  .to(ActiveTodoServiceImpl);
appContainer
  .bind<ISavedForLaterTodoService>(GLOBAL_TYPES.SavedForLaterTodoService)
  .to(SavedForLaterTodoServiceImpl);

// Export injected dependencies
// GLOBAL DEPENDENCIES
export const appStore = appContainer.get<IAppStore>(GLOBAL_TYPES.AppStore);
export const queryClient = appContainer.get<IQueryClient>(
  GLOBAL_TYPES.QueryClient,
);
// SERVICES
export const activeTodoService = appContainer.get<IActiveTodoService>(
  GLOBAL_TYPES.ActiveTodoService,
);
export const savedForLaterTodoService =
  appContainer.get<ISavedForLaterTodoService>(
    GLOBAL_TYPES.SavedForLaterTodoService,
  );
