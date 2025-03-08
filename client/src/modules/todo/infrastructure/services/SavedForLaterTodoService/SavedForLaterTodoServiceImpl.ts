import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { GetAllMethodImpl } from './methods/getAll';
import { GetOneByIdMethodImpl } from './methods/getOneById';
import { SaveForLaterMethodImpl } from './methods/saveForLater';
import { ActivateMethodImpl } from './methods/activate';
import { DeleteOneMethodImpl } from './methods/deleteOne';
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
