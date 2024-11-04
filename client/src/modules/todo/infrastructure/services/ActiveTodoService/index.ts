import { appContainer } from 'src/modules/global/appContainer';
import { TODO_SERVICE_TYPES } from 'src/modules/todo/domain/services/types';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';

export const activeTodoService = appContainer.get<IActiveTodoService>(
  TODO_SERVICE_TYPES.ActiveTodoService,
);
