// Globals
import { IAppStoreProvider } from './appStoreProvider/IAppStoreProvider';
import { IQueryClientProvider } from './queryClientProvider/IQueryClientProvider';
import { IApplicationEventEmitter } from './ApplicationEventEmitter/IApplicationEventEmitter';

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
import { HandleActiveTodoDelete } from '../useCases/review/eventHandlers/HandleActiveTodoDelete';

export const DI_SYMBOLS = {
  // Globals
  AppStoreProvider: Symbol.for('AppStoreProvider'),
  QueryClientProvider: Symbol.for('QueryClientProvider'),
  ApplicationEventEmitter: Symbol.for('ApplicationEventEmitter'),

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
  HandleActiveTodoDelete: Symbol.for('HandleActiveTodoDelete'),
};

export interface DI_RETURN_TYPES {
  // Globals
  AppStoreProvider: IAppStoreProvider;
  QueryClientProvider: IQueryClientProvider;
  ApplicationEventEmitter: IApplicationEventEmitter;

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
  HandleActiveTodoDelete: HandleActiveTodoDelete;
}

export function InjectionSymbol<K extends keyof typeof DI_SYMBOLS>(symbol: K) {
  return DI_SYMBOLS[symbol];
}

export type InjectionType<K extends keyof typeof DI_SYMBOLS> =
  DI_RETURN_TYPES[K];
