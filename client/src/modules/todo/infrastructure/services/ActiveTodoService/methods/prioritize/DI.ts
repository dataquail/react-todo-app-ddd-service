import { useAppStore } from 'src/lib/store';
import { Prioritize } from '.';
import { useMemo } from 'react';

export const usePrioritize = () => {
  const appStore = useAppStore();

  return useMemo(() => Prioritize(appStore), [appStore]);
};
