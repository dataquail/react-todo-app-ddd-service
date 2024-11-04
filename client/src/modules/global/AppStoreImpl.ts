import { injectable } from 'inversify';
import { IAppStore } from './IAppStore';
import { makeStore } from 'src/lib/store';

@injectable()
export class AppStoreImpl implements IAppStore {
  public instance = makeStore();

  public getState() {
    return this.instance.getState();
  }

  public dispatch = this.instance.dispatch.bind(this.instance);
}
