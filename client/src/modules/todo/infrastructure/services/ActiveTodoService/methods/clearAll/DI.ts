import { AppStore } from 'src/lib/store';
import { removeAllActiveTodos } from '../../activeTodoStore';

export const ClearAllMethodImpl = (appStore: AppStore) => () =>
  appStore.dispatch(removeAllActiveTodos());
