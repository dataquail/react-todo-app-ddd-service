import { Todo } from '../Todo';
import { CreateTodoBody } from '../dtos/CreateTodoBody';

export type ITodoService = {
  create: (createTodoBody: CreateTodoBody) => Promise<void>;
  delete: (todoId: string) => Promise<void>;
  getAll: () => Promise<Todo[]>;
  complete: (id: string) => Promise<void>;
  uncomplete: (id: string) => Promise<void>;
  // getOneById: (id: string) => Promise<Todo | undefined>;
};

export type ITodoServiceReactive = {
  create: {
    mutateAsync: ITodoService['create'];
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    data: Awaited<ReturnType<ITodoService['create']>> | undefined;
  };
  delete: {
    mutateAsync: ITodoService['delete'];
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    data: Awaited<ReturnType<ITodoService['delete']>> | undefined;
  };
  complete: {
    mutateAsync: ITodoService['complete'];
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    data: Awaited<ReturnType<ITodoService['complete']>> | undefined;
  };
  uncomplete: {
    mutateAsync: ITodoService['uncomplete'];
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    data: Awaited<ReturnType<ITodoService['uncomplete']>> | undefined;
  };
  getAll: {
    queryAsync: ITodoService['getAll'];
    meta: {
      isPending: boolean;
      isSuccess: boolean;
      isError: boolean;
      error: Error | null;
      data: Todo[] | undefined;
    };
    useQuery: () => {
      isPending: boolean;
      isSuccess: boolean;
      isError: boolean;
      error: Error | null;
      data: Todo[] | undefined;
    };
  };
};
