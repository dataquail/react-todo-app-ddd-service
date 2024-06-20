import { parseISO } from 'date-fns';
import { Todo } from 'src/modules/todo/domain/Todo';
import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';

export const toTodoDomain = (todoDto: TodoDto): Todo =>
  new Todo(
    todoDto.id,
    todoDto.title,
    parseISO(todoDto.created_at),
    todoDto.completed_at ? parseISO(todoDto.completed_at) : undefined,
  );
