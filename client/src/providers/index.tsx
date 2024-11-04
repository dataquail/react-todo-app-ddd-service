import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as StoreProvider } from 'react-redux';
import { appStore } from 'src/modules/global/appStore';
import { queryClient } from 'src/modules/global/queryClient';

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
