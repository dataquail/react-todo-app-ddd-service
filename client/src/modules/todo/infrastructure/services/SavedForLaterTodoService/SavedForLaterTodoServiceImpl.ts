import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { GetAllMethodImpl } from './methods/getAll/DI';
import { GetOneByIdMethodImpl } from './methods/getOneById/DI';
import { SaveForLaterMethodImpl } from './methods/saveForLater/DI';
import { ActivateMethodImpl } from './methods/activate/DI';
import { DeleteOneMethodImpl } from './methods/deleteOne/DI';
import { inject, injectable } from 'inversify';
import { GLOBAL_TYPES } from 'src/modules/global/types';
import { type IQueryClientProvider } from 'src/modules/global/queryClientProvider/IQueryClientProvider';

@injectable()
export class SavedForLaterTodoServiceImpl implements ISavedForLaterTodoService {
  public getAll: ISavedForLaterTodoService['getAll'];
  public getOneById: ISavedForLaterTodoService['getOneById'];
  public saveForLater: ISavedForLaterTodoService['saveForLater'];
  public activate: ISavedForLaterTodoService['activate'];
  public deleteOne: ISavedForLaterTodoService['deleteOne'];

  constructor(
    @inject(GLOBAL_TYPES.QueryClientProvider)
    queryClientProvider: IQueryClientProvider,
  ) {
    this.getAll = GetAllMethodImpl(queryClientProvider.get());
    this.getOneById = GetOneByIdMethodImpl(queryClientProvider.get());
    this.saveForLater = SaveForLaterMethodImpl(queryClientProvider.get());
    this.activate = ActivateMethodImpl(queryClientProvider.get());
    this.deleteOne = DeleteOneMethodImpl(queryClientProvider.get());
  }
}
