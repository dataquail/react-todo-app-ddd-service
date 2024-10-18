import { QueryClient } from '@tanstack/react-query';
import { Singleton, Graph, ObjectGraph, Provides } from 'react-obsidian';
import { type AppDispatch, type AppStore, makeStore } from 'src/lib/store';

@Singleton()
@Graph()
export class ApplicationGraph extends ObjectGraph {
  @Provides()
  appStore(): AppStore {
    return makeStore();
  }

  @Provides()
  appDispatch(appStore: AppStore): AppDispatch {
    return appStore.dispatch;
  }

  @Provides()
  queryClient(): QueryClient {
    return new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 60 * 1000,
        },
      },
    });
  }
}
