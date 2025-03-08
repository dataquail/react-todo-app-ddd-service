import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as StoreProvider } from 'react-redux';
import { injectComponent } from 'src/utils/inversify/injectComponent';
import { IAppStoreProvider } from 'src/modules/global/appStoreProvider/IAppStoreProvider';
import { IQueryClientProvider } from 'src/modules/global/queryClientProvider/IQueryClientProvider';
import { appContainer } from 'src/modules/global/appContainer';
import { GLOBAL_TYPES } from 'src/modules/global/types';

type InjectedProps = {
  appStoreProvider: IAppStoreProvider;
  queryClientProvider: IQueryClientProvider;
};

type OwnProps = {
  children: ReactNode;
};

const _Providers = ({
  children,
  appStoreProvider,
  queryClientProvider,
}: InjectedProps & OwnProps) => {
  return (
    <StoreProvider store={appStoreProvider.get()}>
      <ThemeProvider>
        <QueryClientProvider client={queryClientProvider.get()}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export const Providers = injectComponent<InjectedProps, OwnProps>(
  _Providers,
  appContainer,
  {
    appStoreProvider: GLOBAL_TYPES.AppStoreProvider,
    queryClientProvider: GLOBAL_TYPES.QueryClientProvider,
  },
);
