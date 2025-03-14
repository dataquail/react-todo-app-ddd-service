// Globals
import { IAppStoreProvider } from './appStoreProvider/IAppStoreProvider';
import { IQueryClientProvider } from './queryClientProvider/IQueryClientProvider';

// Services
import { IActiveTodoService } from '../domain/activeTodo/ports/IActiveTodoService';
import { ISavedForLaterTodoService } from '../domain/savedForLaterTodo/ports/ISavedForLaterTodoService';

// Repositories
import { IReviewedTodoRepository } from '../domain/review/ports/IReviewedTodoRepository';
import { IReviewRepository } from '../domain/review/ports/IReviewRepository';

// Use Cases
import { FinishReview } from '../useCases/review/application/FinishReview';
import { GetTodosUnderReview } from '../useCases/review/application/GetTodosUnderReview';
import { StartReview } from '../useCases/review/application/StartReview';

export const DI_SYMBOLS = {
  // Globals
  AppStoreProvider: Symbol.for('AppStoreProvider'),
  QueryClientProvider: Symbol.for('QueryClientProvider'),

  // Services
  ActiveTodoService: Symbol.for('ActiveTodoService'),
  SavedForLaterTodoService: Symbol.for('SavedForLaterTodoService'),

  // Repositories
  ReviewedTodoRepository: Symbol.for('ReviewedTodoRepository'),
  ReviewRepository: Symbol.for('ReviewRepository'),

  // Use Cases
  StartReview: Symbol.for('StartReview'),
  FinishReview: Symbol.for('FinishReview'),
  GetTodosUnderReview: Symbol.for('GetTodosUnderReview'),
};

export interface DI_RETURN_TYPES {
  // Globals
  AppStoreProvider: IAppStoreProvider;
  QueryClientProvider: IQueryClientProvider;

  // Services
  ActiveTodoService: IActiveTodoService;
  SavedForLaterTodoService: ISavedForLaterTodoService;

  // Repositories
  ReviewedTodoRepository: IReviewedTodoRepository;
  ReviewRepository: IReviewRepository;

  // Use Cases
  StartReview: StartReview;
  FinishReview: FinishReview;
  GetTodosUnderReview: GetTodosUnderReview;
}

export function InjectionSymbol<K extends keyof typeof DI_SYMBOLS>(symbol: K) {
  return DI_SYMBOLS[symbol];
}

export type InjectionType<K extends keyof typeof DI_SYMBOLS> =
  DI_RETURN_TYPES[K];
