import { IGetTodo } from '../../network/getTodo';
import { ITodoStore } from '../../store/types';
import { toTodoDomain } from '../../utils/toTodoDomain';

export const GetOneById =
  (getTodo: IGetTodo, todoStore: ITodoStore) => async (todoId: string) => {
    const todoDto = await getTodo(todoId);

    // migrate todo into the store;
    if (!todoStore.findOneById(todoDto.id)) {
      todoStore.save({ id: todoDto.id, isFavorited: false });
    }

    const todoRecord = todoStore.findOneById(todoDto.id);

    if (!todoRecord) {
      throw new Error('Todo Record not found in store');
    }

    return toTodoDomain(todoDto, todoRecord);
  };
