import { Reactive } from 'src/utils/domain/Reactive';
import { InvokableReactive } from 'src/utils/domain/InvokableReactive';
import { Todo } from '../Todo';
import { CreateTodoBody } from '../dtos/CreateTodoBody';

export type ITodoService = {
  create: (createTodoBody: CreateTodoBody) => Promise<void>;
  // delete: (id: string) => void;
  getAll: () => Promise<Todo[]>;
  // getOneById: (id: string) => Promise<Todo | undefined>;
  // complete: (id: string) => Promise<void>;
  // uncomplete: (id: string) => Promise<void>;
};

export type ITodoServiceReactive = {
  useGetAll: () => Reactive<Awaited<ReturnType<ITodoService['getAll']>>>;
  useCreate: () => InvokableReactive<ITodoService['create']>;
  // useGetOneById: ITodoService['getOneById'];
};

// const { create } = useTodoService();

// create.execute({ title: 'Buy milk' });
// if (create.isPending) {
//   // Show loading spinner
// }

// const { data, isPending } = useTodoService().getAll();
