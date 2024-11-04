import { injectable, inject } from 'inversify';
import { GLOBAL_TYPES } from 'src/modules/global/types';
import { type IAppStore } from 'src/modules/global/appStore/IAppStore';
import { type IQueryClient } from 'src/modules/global/queryClient/IQueryClient';
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
    @inject(GLOBAL_TYPES.AppStore) appStore: IAppStore,
    @inject(GLOBAL_TYPES.QueryClient) queryClient: IQueryClient,
  ) {
    this.getAll = GetAllMethodImpl(appStore, queryClient);
    this.getOneById = GetOneByIdMethodImpl(appStore, queryClient);
    this.clearAll = ClearAllMethodImpl(appStore);
    this.createOne = CreateOneMethodImpl(queryClient);
    this.deleteOne = DeleteOneMethodImpl(queryClient, appStore);
    this.completeOne = CompleteOneMethodImpl(queryClient);
    this.uncompleteOne = UncompleteOneMethodImpl(queryClient);
    this.prioritize = PrioritizeMethodImpl(appStore);
    this.deprioritize = DeprioritizeMethodImpl(appStore);
  }
}
