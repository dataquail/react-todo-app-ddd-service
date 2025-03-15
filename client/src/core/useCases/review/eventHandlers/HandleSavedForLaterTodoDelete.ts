import { inject, injectable } from 'inversify';
import { InjectionSymbol, type InjectionType } from 'src/core/global/types';
import { SavedForLaterTodoDeletedEvent } from 'src/core/domain/savedForLaterTodo/events/SavedForLaterTodoDeletedEvent';

@injectable()
export class HandleSavedForLaterTodoDelete {
  constructor(
    @inject(InjectionSymbol('ReviewRepository'))
    private readonly reviewRepository: InjectionType<'ReviewRepository'>,
    @inject(InjectionSymbol('ReviewedTodoRepository'))
    private readonly reviewedTodoRepository: InjectionType<'ReviewedTodoRepository'>,
    @inject(InjectionSymbol('ApplicationEventEmitter'))
    private readonly applicationEventEmitter: InjectionType<'ApplicationEventEmitter'>,
  ) {
    this.applicationEventEmitter.subscribe(this.execute.bind(this));
  }

  public execute(event: unknown) {
    if (event instanceof SavedForLaterTodoDeletedEvent) {
      const review = this.reviewRepository.get.call();

      if (review) {
        this.reviewRepository.save({
          createdAt: review.createdAt,
          todoIdList: review.todoIdList.filter(
            (todoId) => todoId !== event.payload.id,
          ),
        });
      }

      this.reviewedTodoRepository.delete({ id: event.payload.id });
    }
  }
}
