import { ReactNode } from 'react';
import { InitialState } from 'src/lib/store';
import { getReduxWrapper } from 'src/__test__/getReduxWrapper';
import { getThemeWrapper } from 'src/__test__/getThemeWrapper';

export const getTestWrapper = ({
  initialState,
}: {
  initialState?: InitialState;
} = {}) => {
  const { store, ReduxWrapper } = getReduxWrapper({ initialState });
  const { ThemeWrapper } = getThemeWrapper();

  return {
    store,
    TestWrapper: ({ children }: { children: ReactNode }) => (
      <ReduxWrapper>
        <ThemeWrapper>{children}</ThemeWrapper>
      </ReduxWrapper>
    ),
  };
};
