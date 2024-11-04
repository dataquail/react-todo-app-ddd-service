import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { GetAllMethodImpl } from './methods/getAll/DI';
import { GetOneByIdMethodImpl } from './methods/getOneById/DI';
import { SaveForLaterMethodImpl } from './methods/saveForLater/DI';
import { ActivateMethodImpl } from './methods/activate/DI';
import { DeleteOneMethodImpl } from './methods/deleteOne/DI';
import { inject, injectable } from 'inversify';
import { GLOBAL_TYPES } from 'src/modules/global/types';
import { type IQueryClient } from 'src/modules/global/queryClient/IQueryClient';

@injectable()
export class SavedForLaterTodoServiceImpl implements ISavedForLaterTodoService {
  public getAll: ISavedForLaterTodoService['getAll'];
  public getOneById: ISavedForLaterTodoService['getOneById'];
  public saveForLater: ISavedForLaterTodoService['saveForLater'];
  public activate: ISavedForLaterTodoService['activate'];
  public deleteOne: ISavedForLaterTodoService['deleteOne'];

  constructor(@inject(GLOBAL_TYPES.QueryClient) queryClient: IQueryClient) {
    this.getAll = GetAllMethodImpl(queryClient);
    this.getOneById = GetOneByIdMethodImpl(queryClient);
    this.saveForLater = SaveForLaterMethodImpl(queryClient);
    this.activate = ActivateMethodImpl(queryClient);
    this.deleteOne = DeleteOneMethodImpl(queryClient);
  }
}
