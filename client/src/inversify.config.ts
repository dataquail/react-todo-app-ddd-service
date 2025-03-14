import 'reflect-metadata';
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
import { TODO_REPOSITORY_TYPES } from './modules/todo/domain/repositories/types';
import { IReviewRepository } from './modules/todo/domain/repositories/IReviewRepository';
import { ReviewRepositoryImpl } from './modules/todo/infrastructure/repositories/ReviewRepository/ReviewRepositoryImpl';
import { IReviewedTodoRepository } from './modules/todo/domain/repositories/IReviewedTodoRepository';
import { ReviewedTodoRepositoryImpl } from './modules/todo/infrastructure/repositories/ReviewedTodoRepository/ReviewedRepositoryImpl';
import { StartReview } from './modules/todo/infrastructure/useCases/commands/StartReview';
import { FinishReview } from './modules/todo/infrastructure/useCases/commands/FinishReview';
import { GetTodosUnderReview } from './modules/todo/infrastructure/useCases/queries/GetTodosUnderReview';
import { TODO_USECASE_TYPES } from './modules/todo/infrastructure/useCases/types';

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

// REPOSITORIES
appContainer
  .bind<IReviewRepository>(TODO_REPOSITORY_TYPES.ReviewRepository)
  .to(ReviewRepositoryImpl);
appContainer
  .bind<IReviewedTodoRepository>(TODO_REPOSITORY_TYPES.ReviewedTodoRepository)
  .to(ReviewedTodoRepositoryImpl);

// USE CASES
appContainer.bind<StartReview>(TODO_USECASE_TYPES.StartReview).to(StartReview);
appContainer
  .bind<FinishReview>(TODO_USECASE_TYPES.FinishReview)
  .to(FinishReview);
appContainer
  .bind<GetTodosUnderReview>(TODO_USECASE_TYPES.GetTodosUnderReview)
  .to(GetTodosUnderReview);
