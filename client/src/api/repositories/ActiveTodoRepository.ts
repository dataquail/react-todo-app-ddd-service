import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';
import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';
import { TodoListDto } from 'src/modules/todo/domain/dtos/TodoListDto';
import { v4 } from 'uuid';

export class ActiveTodoRepository {
  private todoList: TodoDto[] = [];

  public getAll(): TodoListDto {
    return {
      total_count: this.todoList.length,
      list: this.todoList,
    };
  }

  public getOneById(id: string): TodoDto | undefined {
    return this.todoList.find((todo) => todo.id === id);
  }

  public create(
    createTodoBody: CreateTodoBody & { created_at?: string },
  ): string {
    const todoId = v4();
    this.todoList.push({
      id: todoId,
      title: createTodoBody.title,
      created_at: createTodoBody.created_at
        ? createTodoBody.created_at
        : new Date().toISOString(),
      completed_at: null,
    });
    return todoId;
  }

  public delete(id: string): void {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    return;
  }

  public complete(id: string): void {
    const todo = this.getOneById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.completed_at = new Date().toISOString();
    return;
  }

  public uncomplete(id: string): void {
    const todo = this.getOneById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.completed_at = null;
    return;
  }
}
