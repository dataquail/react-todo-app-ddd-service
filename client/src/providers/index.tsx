import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as StoreProvider } from 'react-redux';
import { appStore, queryClient } from 'src/inversify.config';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider store={appStore.instance}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient.instance}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
