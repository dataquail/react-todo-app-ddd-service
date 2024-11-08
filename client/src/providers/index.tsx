import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as StoreProvider } from 'react-redux';
import { getAppStoreProvider } from 'src/modules/global/appStoreProvider';
import { getQueryClientProvider } from 'src/modules/global/queryClientProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider store={getAppStoreProvider().get()}>
      <ThemeProvider>
        <QueryClientProvider client={getQueryClientProvider().get()}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
