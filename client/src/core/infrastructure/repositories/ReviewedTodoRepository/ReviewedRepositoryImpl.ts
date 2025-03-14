import { inject, injectable } from 'inversify';
import { useAppSelector } from 'src/lib/store';
import { IReviewedTodoRepository } from 'src/core/domain/review/ports/IReviewedTodoRepository';
import {
  deleteReviewedTodo,
  ReviewedTodoRecord,
  saveManyReviewedTodos,
  saveReviewedTodo,
} from './reviewedTodoStore';
import { ReviewedTodo } from 'src/core/domain/review/entities/ReviewedTodo';
import { InjectionSymbol, type InjectionType } from 'src/core/global/types';

@injectable()
export class ReviewedTodoRepositoryImpl implements IReviewedTodoRepository {
  public readonly save: IReviewedTodoRepository['save'];
  public readonly delete: IReviewedTodoRepository['delete'];
  public readonly saveMany: IReviewedTodoRepository['saveMany'];
  public readonly getOneById: IReviewedTodoRepository['getOneById'];

  constructor(
    @inject(InjectionSymbol('AppStoreProvider'))
    private readonly appStoreProvider: InjectionType<'AppStoreProvider'>,
  ) {
    this.save = this.saveImpl;
    this.delete = this.deleteImpl;
    this.saveMany = this.saveManyImpl;
    this.getOneById = this.getOneByIdImpl;
  }

  private saveImpl(reviewedTodo: ReviewedTodo) {
    this.appStoreProvider.get().dispatch(saveReviewedTodo(reviewedTodo));
  }

  private deleteImpl(reviewedTodo: ReviewedTodo) {
    this.appStoreProvider.get().dispatch(deleteReviewedTodo(reviewedTodo));
  }

  private saveManyImpl(reviewedTodos: ReviewedTodo[]) {
    this.appStoreProvider.get().dispatch(saveManyReviewedTodos(reviewedTodos));
  }

  private readonly getOneByIdImpl: IReviewedTodoRepository['getOneById'] = {
    call: (args) => {
      const record = this.appStoreProvider.get().getState().todo.reviewedTodo[
        args.id
      ];
      return record ? ReviewedTodoRepositoryImpl.toDomain(record) : undefined;
    },
    use: (args) => {
      /* eslint-disable react-hooks/rules-of-hooks */
      const record = useAppSelector(
        (state) => state.todo.reviewedTodo[args.id],
      );
      return record ? ReviewedTodoRepositoryImpl.toDomain(record) : undefined;
    },
  };

  private static toDomain(record: ReviewedTodoRecord): ReviewedTodo {
    return {
      id: record.id,
      lastReviewedAt: new Date(record.lastReviewedAt),
    };
  }
}
