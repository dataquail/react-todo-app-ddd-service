import {
  DependenciesOf,
  Graph,
  injectHook,
  ObjectGraph,
  Provides,
  Singleton,
} from 'react-obsidian';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { GetOneByIdMethod } from './methods/getOneById/DI';
import { DeleteOneMethod } from './methods/deleteOne/DI';
import { CompleteOneMethod } from './methods/complete/DI';
import { UncompleteOneMethod } from './methods/uncomplete/DI';
import { GetAllMethod } from './methods/getAll/DI';
import { CreateOneMethod } from './methods/createOne/DI';
import { PrioritizeMethod } from './methods/prioritize/DI';
import { DeprioritizeMethod } from './methods/deprioritize/DI';
import { ClearAllMethod } from './methods/clearAll/DI';

@Singleton()
@Graph({
  subgraphs: [
    GetAllMethod,
    GetOneByIdMethod,
    CreateOneMethod,
    DeleteOneMethod,
    CompleteOneMethod,
    UncompleteOneMethod,
    PrioritizeMethod,
    DeprioritizeMethod,
    ClearAllMethod,
  ],
})
export class ActiveTodoService extends ObjectGraph {
  @Provides()
  getAll(getAllImpl: ReturnType<GetAllMethod['getAllImpl']>) {
    return getAllImpl;
  }

  @Provides()
  getOneById(getOneByIdImpl: ReturnType<GetOneByIdMethod['getOneByIdImpl']>) {
    return getOneByIdImpl;
  }

  @Provides()
  clearAll(clearAllImpl: ReturnType<ClearAllMethod['clearAllImpl']>) {
    return clearAllImpl;
  }

  @Provides()
  createOne(createOneImpl: ReturnType<CreateOneMethod['createOneImpl']>) {
    return createOneImpl;
  }

  @Provides()
  deleteOne(deleteOneImpl: ReturnType<DeleteOneMethod['deleteOneImpl']>) {
    return deleteOneImpl;
  }

  @Provides()
  completeOne(
    completeOneImpl: ReturnType<CompleteOneMethod['completeOneImpl']>,
  ) {
    return completeOneImpl;
  }

  @Provides()
  uncompleteOne(
    uncompleteOneImpl: ReturnType<UncompleteOneMethod['uncompleteOneImpl']>,
  ) {
    return uncompleteOneImpl;
  }

  @Provides()
  prioritize(prioritizeImpl: ReturnType<PrioritizeMethod['prioritizeImpl']>) {
    return prioritizeImpl;
  }

  @Provides()
  deprioritize(
    deprioritizeImpl: ReturnType<DeprioritizeMethod['deprioritizeImpl']>,
  ) {
    return deprioritizeImpl;
  }
}

const activeTodoServiceHook = (
  injected: DependenciesOf<ActiveTodoService>,
): IActiveTodoService => injected;

export const useActiveTodoService = injectHook(
  activeTodoServiceHook,
  ActiveTodoService,
);
