import { inject, injectable } from 'inversify';
import { type IReviewRepository } from 'src/modules/todo/domain/repositories/IReviewRepository';
import { TODO_REPOSITORY_TYPES } from 'src/modules/todo/domain/repositories/types';
import { type IReviewedTodoRepository } from 'src/modules/todo/domain/repositories/IReviewedTodoRepository';
import { createReviewedTodo } from 'src/modules/todo/domain/ReviewedTodo';

@injectable()
export class FinishReview {
  constructor(
    @inject(TODO_REPOSITORY_TYPES.ReviewRepository)
    private readonly reviewRepository: IReviewRepository,
    @inject(TODO_REPOSITORY_TYPES.ReviewedTodoRepository)
    private readonly reviewedTodoRepository: IReviewedTodoRepository,
  ) {}

  public execute() {
    const review = this.reviewRepository.get.call();

    if (!review) {
      throw new Error('No review found');
    }

    const reviewedTodoList = review.todoIdList.map((todoId) =>
      createReviewedTodo(todoId),
    );

    this.reviewedTodoRepository.saveMany(reviewedTodoList);
    this.reviewRepository.delete();
  }
}
