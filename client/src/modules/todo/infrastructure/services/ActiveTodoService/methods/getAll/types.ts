import { TodoListDto } from 'src/modules/todo/domain/dtos/TodoListDto';

export type IGetAllActiveTodos = () => Promise<TodoListDto>;
