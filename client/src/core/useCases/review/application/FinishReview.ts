import { inject, injectable } from 'inversify';
import { InjectionSymbol, type InjectionType } from 'src/core/global/types';
import { createReviewedTodo } from 'src/core/domain/review/entities/ReviewedTodo';

@injectable()
export class FinishReview {
  constructor(
    @inject(InjectionSymbol('ReviewRepository'))
    private readonly reviewRepository: InjectionType<'ReviewRepository'>,
    @inject(InjectionSymbol('ReviewedTodoRepository'))
    private readonly reviewedTodoRepository: InjectionType<'ReviewedTodoRepository'>,
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
