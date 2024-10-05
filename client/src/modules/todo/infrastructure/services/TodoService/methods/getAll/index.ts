import { IGetTodoList } from '../../network/getTodoList';
import { ITodoStore } from '../../store/types';
import { toTodoDomain } from '../../utils/toTodoDomain';

export const GetAll =
  (getTodoList: IGetTodoList, todoStore: ITodoStore) => async () => {
    const todoListDto = await getTodoList();

    // migrate all todos into the store;
    todoListDto.list.forEach((todoDto) => {
      const todoRecord = todoStore.findOneById(todoDto.id);
      if (!todoRecord) {
        todoStore.save({ id: todoDto.id, isFavorited: false });
      }
    });

    return todoListDto.list.map((todoDto) => {
      const todoRecord = todoStore.findOneById(todoDto.id);
      if (!todoRecord) {
        throw new Error('Todo not found in store');
      }
      return toTodoDomain(todoDto, todoRecord);
    });
  };
