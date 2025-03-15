import 'reflect-metadata';
import { appContainer } from 'src/core/global/appContainer';
import { DI_CONFIG } from 'src/core/global/DI';
import { InjectionSymbol } from './types';
/**
 * Inversify container configuration.
 *
 * Binds all dependencies to their respective implementations.
 */

// GLOBAL DEPENDENCIES
DI_CONFIG.global.DI_ARRAY.forEach(([symbol, impl]) => {
  appContainer.bind(symbol).to(impl).inSingletonScope();
});

// SERVICES
DI_CONFIG.services.DI_ARRAY.forEach(([symbol, impl]) => {
  appContainer.bind(symbol).to(impl);
});

// REPOSITORIES
DI_CONFIG.repositories.DI_ARRAY.forEach(([symbol, impl]) => {
  appContainer.bind(symbol).to(impl);
});

// USE CASES
DI_CONFIG.useCases.DI_ARRAY.forEach(([symbol, impl]) => {
  appContainer.bind(symbol).to(impl);
});

// Eagerly instantiate event handlers
const EVENT_HANDLERS = [
  'HandleActiveTodoDelete',
  'HandleSavedForLaterTodoDelete',
  // Add other event handlers here
] as const;

EVENT_HANDLERS.forEach((handler) => {
  appContainer.get(InjectionSymbol(handler));
});
