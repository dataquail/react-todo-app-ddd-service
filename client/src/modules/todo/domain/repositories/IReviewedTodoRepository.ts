import { ChimericRead } from 'src/utils/domain/ChimericRead';
import { ReviewedTodo } from '../ReviewedTodo';

export type IReviewedTodoRepository = {
  save: (reviewedTodo: ReviewedTodo) => void;
  saveMany: (reviewedTodos: ReviewedTodo[]) => void;
  delete: (reviewedTodo: ReviewedTodo) => void;
  getOneById: ChimericRead<(args: { id: string }) => ReviewedTodo | undefined>;
};
