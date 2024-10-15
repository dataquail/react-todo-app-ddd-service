import { useAppStore } from 'src/lib/store';
import { Deprioritize } from '.';
import { useMemo } from 'react';

export const useDeprioritize = () => {
  const appStore = useAppStore();

  return useMemo(() => Deprioritize(appStore), [appStore]);
};
