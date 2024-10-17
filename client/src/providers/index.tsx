import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { DependenciesOf, injectComponent } from 'react-obsidian';
import { ApplicationGraph } from 'src/api/global/ApplicationGraph';
import { Provider as StoreProvider } from 'react-redux';

type Own = { children: ReactNode };
type Injected = DependenciesOf<ApplicationGraph, 'appStore' | 'queryClient'>;

const ProvidersDI = ({ children, appStore, queryClient }: Own & Injected) => {
  return (
    <StoreProvider store={appStore}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export const Providers = injectComponent<Own, Injected>(
  ProvidersDI,
  ApplicationGraph,
);
