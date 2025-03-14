import { inject, injectable } from 'inversify';
import { TODO_SERVICE_TYPES } from 'src/modules/todo/domain/services/types';
import { type IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { type IReviewRepository } from 'src/modules/todo/domain/repositories/IReviewRepository';
import { TODO_REPOSITORY_TYPES } from 'src/modules/todo/domain/repositories/types';
import { type ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { type IReviewedTodoRepository } from 'src/modules/todo/domain/repositories/IReviewedTodoRepository';
import { ActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { Review } from 'src/modules/todo/domain/Review';
import { SavedForLaterTodo } from 'src/modules/todo/domain/SavedForLaterTodo';
import { ChimericAsyncReadFactory } from 'src/utils/domain/ChimericAsyncRead';
import { makeMetaAggregator } from 'src/utils/domain/makeMetaAggregator';
import { TodoUnderReview } from 'src/modules/todo/domain/viewModels/TodoUnderReview';

type GetTodosUnderReviewChimaric = ChimericAsyncReadFactory<
  () => Promise<TodoUnderReview[]>,
  Error
>;

@injectable()
export class GetTodosUnderReview {
  public readonly useAsync: GetTodosUnderReviewChimaric['useAsync'];
  public readonly call: GetTodosUnderReviewChimaric['call'];

  constructor(
    @inject(TODO_REPOSITORY_TYPES.ReviewRepository)
    private readonly reviewRepository: IReviewRepository,
    @inject(TODO_REPOSITORY_TYPES.ReviewedTodoRepository)
    private readonly reviewedTodoRepository: IReviewedTodoRepository,
    @inject(TODO_SERVICE_TYPES.ActiveTodoService)
    private readonly activeTodoService: IActiveTodoService,
    @inject(TODO_SERVICE_TYPES.SavedForLaterTodoService)
    private readonly savedForLaterTodoService: ISavedForLaterTodoService,
  ) {
    this.useAsync = this.useAsyncImpl;
    this.call = this.callImpl;
  }

  private useAsyncImpl() {
    const activeTodoListMeta = this.activeTodoService.getAll.useQuery();
    const savedForLaterTodoListMeta =
      this.savedForLaterTodoService.getAll.useQuery();
    const review = this.reviewRepository.get.use();

    return makeMetaAggregator(
      [activeTodoListMeta, savedForLaterTodoListMeta],
      (metaList, context) => {
        const [activeTodoList, savedForLaterTodoList] = metaList;

        if (!activeTodoList || !savedForLaterTodoList || !context.review) {
          return [];
        }

        return this.execute(
          activeTodoList,
          savedForLaterTodoList,
          context.review,
        );
      },
      { review },
    );
  }

  private async callImpl() {
    const activeTodoList = await this.activeTodoService.getAll.call();
    const savedForLaterTodoList =
      await this.savedForLaterTodoService.getAll.call();
    const review = this.reviewRepository.get.call();

    if (!review) {
      return [];
    }

    return this.execute(activeTodoList, savedForLaterTodoList, review);
  }

  private execute(
    activeTodoList: ActiveTodo[],
    savedForLaterTodoList: SavedForLaterTodo[],
    review: Review,
  ) {
    return review.todoIdList.reduce((acc, todoUnderReviewId) => {
      const previouslyReviewedTodo =
        this.reviewedTodoRepository.getOneById.call({
          id: todoUnderReviewId,
        });
      const activeTodo = activeTodoList.find(
        (todo) => todo.id === todoUnderReviewId,
      );
      const savedForLaterTodo = savedForLaterTodoList.find(
        (todo) => todo.id === todoUnderReviewId,
      );

      // If the todoUnderReview does not have a counterpart in the active or saved for later list,
      // then the client state has fallen out of sync with the server stateand we should ignore it.
      if (!activeTodo && !savedForLaterTodo) {
        return acc;
      }

      if (activeTodo) {
        return [
          ...acc,
          {
            id: activeTodo.id,
            title: activeTodo.title,
            createdAt: activeTodo.createdAt,
            completedAt: activeTodo.completedAt,
            isPrioritized: activeTodo.isPrioritized,
            lastReviewedAt: previouslyReviewedTodo?.lastReviewedAt,
          },
        ];
      } else if (savedForLaterTodo) {
        return [
          ...acc,
          {
            id: savedForLaterTodo.id,
            title: savedForLaterTodo.title,
            createdAt: savedForLaterTodo.createdAt,
            completedAt: undefined,
            isPrioritized: null,
            lastReviewedAt: previouslyReviewedTodo?.lastReviewedAt,
          },
        ];
      }

      return acc;
    }, [] as TodoUnderReview[]);
  }
}
