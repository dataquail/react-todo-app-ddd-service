import { ReactNode, useRef } from 'react';
import { AppStore, makeStore } from 'src/lib/store';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ServiceProvider } from 'src/modules/todo/infrastructure/services/ServiceProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>();
  const queryClientRef = useRef<QueryClient>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    const store = makeStore();
    storeRef.current = store;
  }

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 60 * 1000,
        },
      },
    });
  }

  return (
    <StoreProvider store={storeRef.current}>
      <ThemeProvider>
        <QueryClientProvider client={queryClientRef.current}>
          {/* <ServiceProvider> */}
          {children}
          {/* </ServiceProvider> */}
        </QueryClientProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
