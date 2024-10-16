import { HttpResponse, http } from 'msw';
import { SetupWorker } from 'msw/browser';
import { CreateTodoBody } from 'src/modules/todo/domain/dtos/CreateTodoBody';
import { TodoDto } from 'src/modules/todo/domain/dtos/TodoDto';
import { TodoListDto } from 'src/modules/todo/domain/dtos/TodoListDto';
import { getConfig } from 'src/utils/getConfig';
import { v4 } from 'uuid';

class TodoRepository {
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

  public create(createTodoBody: CreateTodoBody): string {
    const todoId = v4();
    this.todoList.push({
      id: todoId,
      title: createTodoBody.title,
      created_at: new Date().toISOString(),
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

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const setupApi = (worker: SetupWorker) => {
  const todoRepository = new TodoRepository();
  worker.use(
    http.get(`${getConfig().API_URL}/todo`, async () => {
      return HttpResponse.json(todoRepository.getAll());
    }),

    http.post(`${getConfig().API_URL}/todo`, async ({ request }) => {
      const createTodoBody =
        (await request.json()) as unknown as CreateTodoBody;
      const todoId = todoRepository.create(createTodoBody);
      return HttpResponse.json({ id: todoId });
    }),

    http.delete(`${getConfig().API_URL}/todo/:id`, async ({ params }) => {
      const id = params.id as unknown as string;
      todoRepository.delete(id);
      return HttpResponse.json({ message: 'success' });
    }),

    http.post(
      `${getConfig().API_URL}/todo/:id/complete`,
      async ({ params }) => {
        const id = params.id as unknown as string;
        todoRepository.complete(id);
        return HttpResponse.json({ message: 'success' });
      },
    ),

    http.post(
      `${getConfig().API_URL}/todo/:id/uncomplete`,
      async ({ params }) => {
        const id = params.id as unknown as string;
        todoRepository.uncomplete(id);
        return HttpResponse.json({ message: 'success' });
      },
    ),

    http.get(`${getConfig().API_URL}/todo/:id`, async ({ params }) => {
      const id = params.id as unknown as string;
      const todo = todoRepository.getOneById(id);
      if (!todo) {
        return new HttpResponse(null, { status: 404 });
      }
      return HttpResponse.json(todo);
    }),
  );

  return worker.start({
    serviceWorker: {
      url: './mockServiceWorker.js',
    },
  });
};
