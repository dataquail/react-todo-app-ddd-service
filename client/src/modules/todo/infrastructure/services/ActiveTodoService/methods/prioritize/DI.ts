import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { ApplicationGraph } from 'src/global/ApplicationGraph';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { type AppStore } from 'src/lib/store';
import { Prioritize } from '.';

@Graph({ subgraphs: [ApplicationGraph] })
export class PrioritizeMethod extends ObjectGraph {
  @Provides()
  prioritizeImpl(appStore: AppStore): IActiveTodoService['prioritize'] {
    return Prioritize(appStore);
  }
}
