import {
  DependenciesOf,
  Graph,
  injectHook,
  ObjectGraph,
  Provides,
  Singleton,
} from 'react-obsidian';
import { GetAllMethod } from './methods/getAll/DI';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { GetOneByIdMethod } from './methods/getOneById/DI';
import { SaveForLaterMethod } from './methods/saveForLater/DI';
import { ActivateMethod } from './methods/activate/DI';
import { DeleteOneMethod } from './methods/deleteOne/DI';

@Singleton()
@Graph({
  subgraphs: [
    GetAllMethod,
    GetOneByIdMethod,
    SaveForLaterMethod,
    ActivateMethod,
    DeleteOneMethod,
  ],
})
export class SavedForLaterTodoService extends ObjectGraph {
  @Provides()
  getAll(getAllImpl: ReturnType<GetAllMethod['getAllImpl']>) {
    return getAllImpl;
  }

  @Provides()
  getOneById(getOneByIdImpl: ReturnType<GetOneByIdMethod['getOneByIdImpl']>) {
    return getOneByIdImpl;
  }

  @Provides()
  saveForLater(
    saveForLaterImpl: ReturnType<SaveForLaterMethod['saveForLaterImpl']>,
  ) {
    return saveForLaterImpl;
  }

  @Provides()
  activate(activateImpl: ReturnType<ActivateMethod['activateImpl']>) {
    return activateImpl;
  }

  @Provides()
  deleteOne(deleteOneImpl: ReturnType<DeleteOneMethod['deleteOneImpl']>) {
    return deleteOneImpl;
  }
}

const savedForLaterTodoServiceHook = (
  injected: DependenciesOf<SavedForLaterTodoService>,
): ISavedForLaterTodoService => injected;

export const useSavedForLaterTodoService = injectHook(
  savedForLaterTodoServiceHook,
  SavedForLaterTodoService,
);
