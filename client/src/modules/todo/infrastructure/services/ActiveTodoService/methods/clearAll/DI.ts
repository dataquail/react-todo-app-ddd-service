import { removeAllActiveTodos } from '../../activeTodoStore';
import { IAppStore } from 'src/modules/global/IAppStore';

export const ClearAllMethodImpl = (appStore: IAppStore) => () =>
  appStore.dispatch(removeAllActiveTodos());
