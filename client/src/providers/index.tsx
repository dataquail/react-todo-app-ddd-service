import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as StoreProvider } from 'react-redux';
import { injectComponent } from 'src/utils/inversify/injectComponent';
import { appContainer } from 'src/core/global/appContainer';
import { InjectionSymbol, type InjectionType } from 'src/core/global/types';

type InjectedProps = {
  appStoreProvider: InjectionType<'AppStoreProvider'>;
  queryClientProvider: InjectionType<'QueryClientProvider'>;
};

type OwnProps = {
  children: ReactNode;
};

export const Providers = injectComponent<InjectedProps, OwnProps>(
  ({ children, appStoreProvider, queryClientProvider }) => {
    return (
      <StoreProvider store={appStoreProvider.get()}>
        <ThemeProvider>
          <QueryClientProvider client={queryClientProvider.get()}>
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </StoreProvider>
    );
  },
  appContainer,
  {
    appStoreProvider: InjectionSymbol('AppStoreProvider'),
    queryClientProvider: InjectionSymbol('QueryClientProvider'),
  },
);
