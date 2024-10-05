import { ITodoService } from 'src/modules/todo/domain/services/ITodoService';
import { ITodoStore } from '../../store/types';

export const Favorite =
  (todoStore: ITodoStore): ITodoService['favorite'] =>
  async (todoId: string) => {
    const todoRecord = todoStore.findOneById(todoId);
    if (!todoRecord) {
      throw new Error('Todo Record not found');
    }
    todoStore.save({ ...todoRecord, isFavorited: true });
  };
