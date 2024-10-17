import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { ApplicationGraph } from 'src/api/global/ApplicationGraph';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { type AppDispatch } from 'src/lib/store';
import { removeAllActiveTodos } from '../../activeTodoStore';

@Graph({ subgraphs: [ApplicationGraph] })
export class ClearAllMethod extends ObjectGraph {
  @Provides()
  clearAllImpl(appDispatch: AppDispatch): IActiveTodoService['clearAll'] {
    return () => appDispatch(removeAllActiveTodos());
  }
}
