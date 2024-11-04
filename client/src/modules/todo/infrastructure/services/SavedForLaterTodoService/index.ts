import { appContainer } from 'src/modules/global/appContainer';
import { TODO_SERVICE_TYPES } from 'src/modules/todo/domain/services/types';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';

export const savedForLaterTodoService =
  appContainer.get<ISavedForLaterTodoService>(
    TODO_SERVICE_TYPES.SavedForLaterTodoService,
  );
