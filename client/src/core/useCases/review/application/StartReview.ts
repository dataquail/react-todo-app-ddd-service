import { inject, injectable } from 'inversify';
import { createReview } from 'src/core/domain/review/entities/Review';
import { ChimericPromiseFactory } from 'src/utils/domain/ChimericPromise';
import { makeChimericPromise } from 'src/utils/domain/makeChimericPromise';
import { InjectionSymbol, type InjectionType } from 'src/core/global/types';

type StartReviewChimeric = ChimericPromiseFactory<() => Promise<void>, Error>;

@injectable()
export class StartReview {
  public readonly usePromise: StartReviewChimeric['usePromise'];
  public readonly call: StartReviewChimeric['call'];

  constructor(
    @inject(InjectionSymbol('ReviewRepository'))
    private readonly reviewRepository: InjectionType<'ReviewRepository'>,
    @inject(InjectionSymbol('ActiveTodoService'))
    private readonly activeTodoService: InjectionType<'ActiveTodoService'>,
    @inject(InjectionSymbol('SavedForLaterTodoService'))
    private readonly savedForLaterTodoService: InjectionType<'SavedForLaterTodoService'>,
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
