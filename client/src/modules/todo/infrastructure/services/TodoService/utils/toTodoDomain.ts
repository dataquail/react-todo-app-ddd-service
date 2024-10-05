import { parseISO } from 'date-fns';
import { Todo } from 'src/modules/todo/domain/Todo';
import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';
import { TodoRecord } from '../store/types';

export const toTodoDomain = (todoDto: TodoDto, todoRecord: TodoRecord): Todo =>
  new Todo(
    todoDto.id,
    todoDto.title,
    parseISO(todoDto.created_at),
    todoDto.completed_at ? parseISO(todoDto.completed_at) : undefined,
    todoRecord.isFavorited,
  );
