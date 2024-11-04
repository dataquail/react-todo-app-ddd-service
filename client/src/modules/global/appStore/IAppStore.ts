import { AppDispatch, AppStore, RootState } from 'src/lib/store';

export interface IAppStore {
  getState(): RootState;
  dispatch: AppDispatch;
  instance: AppStore;
}
