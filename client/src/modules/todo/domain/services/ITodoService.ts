import { Todo } from '../Todo';
import { CreateTodoBody } from '../dtos/CreateTodoBody';

export type ITodoService = {
  create: (createTodoBody: CreateTodoBody) => Promise<void>;
  delete: (todoId: string) => Promise<void>;
  getAll: () => Promise<Todo[]>;
  complete: (id: string) => Promise<void>;
  uncomplete: (id: string) => Promise<void>;
  favorite: (id: string) => Promise<void>;
  unfavorite: (id: string) => Promise<void>;
  getOneById: (id: string) => Promise<Todo | undefined>;
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
  favorite: {
    mutateAsync: ITodoService['favorite'];
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    data: Awaited<ReturnType<ITodoService['favorite']>> | undefined;
  };
  unfavorite: {
    mutateAsync: ITodoService['unfavorite'];
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    data: Awaited<ReturnType<ITodoService['unfavorite']>> | undefined;
  };
  getAll: {
    queryAsync: ITodoService['getAll'];
    useMeta: () => {
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
  getOneById: {
    queryAsync: ITodoService['getOneById'];
    useMeta: (todoId: string) => {
      isPending: boolean;
      isSuccess: boolean;
      isError: boolean;
      error: Error | null;
      data: Todo | undefined;
    };
    useQuery: (id: string) => {
      isPending: boolean;
      isSuccess: boolean;
      isError: boolean;
      error: Error | null;
      data: Todo | undefined;
    };
  };
};
