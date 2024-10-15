import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';

export type IGetActiveTodo = (activeTodoId: string) => Promise<TodoDto>;
