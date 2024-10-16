import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { Singleton, Graph, ObjectGraph, Provides } from 'react-obsidian';
import {
  type AppDispatch,
  type AppStore,
  useAppDispatch,
  useAppStore,
} from 'src/lib/store';

@Singleton()
@Graph()
export class ApplicationGraph extends ObjectGraph {
  @Provides({ name: 'appStore' })
  appStore(): AppStore {
    return useAppStore();
  }

  @Provides()
  appDispatch(): AppDispatch {
    return useAppDispatch();
  }

  @Provides()
  queryClient(): QueryClient {
    return useQueryClient();
  }
}
