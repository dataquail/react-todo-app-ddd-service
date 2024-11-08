import { injectable, inject } from 'inversify';
import { GLOBAL_TYPES } from 'src/modules/global/types';
import { type IAppStoreProvider } from 'src/modules/global/appStoreProvider/IAppStoreProvider';
import { type IQueryClientProvider } from 'src/modules/global/queryClientProvider/IQueryClientProvider';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { GetOneByIdMethodImpl } from './methods/getOneById/DI';
import { DeleteOneMethodImpl } from './methods/deleteOne/DI';
import { CompleteOneMethodImpl } from './methods/complete/DI';
import { UncompleteOneMethodImpl } from './methods/uncomplete/DI';
import { GetAllMethodImpl } from './methods/getAll/DI';
import { CreateOneMethodImpl } from './methods/createOne/DI';
import { PrioritizeMethodImpl } from './methods/prioritize/DI';
import { DeprioritizeMethodImpl } from './methods/deprioritize/DI';
import { ClearAllMethodImpl } from './methods/clearAll/DI';

@injectable()
export class ActiveTodoServiceImpl implements IActiveTodoService {
  public getAll: IActiveTodoService['getAll'];
  public getOneById: IActiveTodoService['getOneById'];
  public clearAll: IActiveTodoService['clearAll'];
  public createOne: IActiveTodoService['createOne'];
  public deleteOne: IActiveTodoService['deleteOne'];
  public completeOne: IActiveTodoService['completeOne'];
  public uncompleteOne: IActiveTodoService['uncompleteOne'];
  public prioritize: IActiveTodoService['prioritize'];
  public deprioritize: IActiveTodoService['deprioritize'];

  constructor(
    @inject(GLOBAL_TYPES.AppStoreProvider) appStoreProvider: IAppStoreProvider,
    @inject(GLOBAL_TYPES.QueryClientProvider)
    queryClientProvider: IQueryClientProvider,
  ) {
    this.getAll = GetAllMethodImpl(
      appStoreProvider.get(),
      queryClientProvider.get(),
    );
    this.getOneById = GetOneByIdMethodImpl(
      appStoreProvider.get(),
      queryClientProvider.get(),
    );
    this.clearAll = ClearAllMethodImpl(appStoreProvider.get());
    this.createOne = CreateOneMethodImpl(queryClientProvider.get());
    this.deleteOne = DeleteOneMethodImpl(
      queryClientProvider.get(),
      appStoreProvider.get(),
    );
    this.completeOne = CompleteOneMethodImpl(queryClientProvider.get());
    this.uncompleteOne = UncompleteOneMethodImpl(queryClientProvider.get());
    this.prioritize = PrioritizeMethodImpl(appStoreProvider.get());
    this.deprioritize = DeprioritizeMethodImpl(appStoreProvider.get());
  }
}
