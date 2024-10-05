import { ITodoService } from 'src/modules/todo/domain/services/ITodoService';
import { ITodoStore } from '../../store/types';

export const Unfavorite =
  (todoStore: ITodoStore): ITodoService['unfavorite'] =>
  async (todoId: string) => {
    const todo = todoStore.findOneById(todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todoStore.save({ ...todo, isFavorited: false });
  };
