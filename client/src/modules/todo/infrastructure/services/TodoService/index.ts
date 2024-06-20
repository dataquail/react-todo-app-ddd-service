import { ITodoService } from 'src/modules/todo/domain/services/ITodoService';
import { IGetTodoList } from './network/getTodoList';
import { toTodoDomain } from './utils/toTodoDomain';
import { ICreateTodo } from './network/createTodo';
import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';

export class TodoService implements ITodoService {
  constructor(
    private readonly getTodoList: IGetTodoList,
    private readonly createTodo: ICreateTodo,
  ) {}

  public async getAll() {
    const todoListDto = await this.getTodoList();
    return todoListDto.list.map((todoDto) => toTodoDomain(todoDto));
  }

  public async create(createTodoBody: CreateTodoBody) {
    await this.createTodo(createTodoBody);
  }
}
