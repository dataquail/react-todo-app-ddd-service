import { inject, injectable } from 'inversify';
import { TODO_SERVICE_TYPES } from 'src/modules/todo/domain/services/types';
import { type IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { type IReviewRepository } from 'src/modules/todo/domain/repositories/IReviewRepository';
import { TODO_REPOSITORY_TYPES } from 'src/modules/todo/domain/repositories/types';
import { type ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { createReview } from 'src/modules/todo/domain/Review';
import { ChimericPromiseFactory } from 'src/utils/domain/ChimericPromise';
import { makeChimericPromise } from 'src/utils/domain/makeChimericPromise';

type StartReviewChimeric = ChimericPromiseFactory<() => Promise<void>, Error>;

@injectable()
export class StartReview {
  public readonly usePromise: StartReviewChimeric['usePromise'];
  public readonly call: StartReviewChimeric['call'];

  constructor(
    @inject(TODO_REPOSITORY_TYPES.ReviewRepository)
    private readonly reviewRepository: IReviewRepository,
    @inject(TODO_SERVICE_TYPES.ActiveTodoService)
    private readonly activeTodoService: IActiveTodoService,
    @inject(TODO_SERVICE_TYPES.SavedForLaterTodoService)
    private readonly savedForLaterTodoService: ISavedForLaterTodoService,
  ) {
    const chimericPromise = makeChimericPromise({
      promiseFn: this.execute.bind(this),
      errorHelpers: {},
    });
    this.usePromise = chimericPromise.usePromise;
    this.call = chimericPromise.call;
  }

  private async execute() {
    const activeTodoList = await this.activeTodoService.getAll.call();
    const savedForLaterTodoList =
      await this.savedForLaterTodoService.getAll.call();

    const todosToReviewIdList: string[] = [
      ...activeTodoList
        .filter((activeTodo) => !activeTodo.completedAt)
        .map((activeTodo) => activeTodo.id),
      ...savedForLaterTodoList.map((savedForLaterTodo) => savedForLaterTodo.id),
    ];

    const review = createReview(todosToReviewIdList);
    this.reviewRepository.save(review);
  }
}
