import { IGetTodoList } from '../../network/getTodoList';
import { toTodoDomain } from '../../utils/toTodoDomain';

export const GetAll = (getTodoList: IGetTodoList) => async () => {
  const todoListDto = await getTodoList();
  return todoListDto.list.map((todoDto) => toTodoDomain(todoDto));
};
