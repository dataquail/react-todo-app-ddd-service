import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { ApplicationGraph } from 'src/global/ApplicationGraph';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { type AppStore } from 'src/lib/store';
import { Deprioritize } from '.';

@Graph({ subgraphs: [ApplicationGraph] })
export class DeprioritizeMethod extends ObjectGraph {
  @Provides()
  deprioritizeImpl(appStore: AppStore): IActiveTodoService['deprioritize'] {
    return Deprioritize(appStore);
  }
}
