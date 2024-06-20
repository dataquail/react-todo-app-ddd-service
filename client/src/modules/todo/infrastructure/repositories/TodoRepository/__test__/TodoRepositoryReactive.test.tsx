import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { Todo } from 'src/modules/todo/domain/Todo';
import { getReduxWrapper } from 'src/__test__/getReduxWrapper';
import { useTodoRepository } from '../DI';
import { todoRepositoryReactive } from '../DIReactive';

type ChildrenProps = {
  children: ReactNode;
};

describe('TodoRepositoryReactive', () => {
  describe('getAll()', () => {
    const getTestHarness = () => {
      const { ReduxWrapper } = getReduxWrapper();
      const useTestHook = () => {
        const todoRepository = useTodoRepository();
        return {
          todoRepository,
          useGetAll: todoRepositoryReactive.useGetAll(),
        };
      };
      return renderHook(useTestHook, {
        wrapper: ({ children }: ChildrenProps) => (
          <ReduxWrapper>{children}</ReduxWrapper>
        ),
      });
    };

    it('useGetAll() is initially empty', () => {
      const { result } = getTestHarness();

      expect(result.current.useGetAll).toEqual([]);
    });

    it('create() adds a new todo to useGetAll()', async () => {
      const { result } = getTestHarness();

      const todo = Todo.create('test todo');

      act(() => {
        result.current.todoRepository.save(todo);
      });

      expect(result.current.useGetAll[0]).toEqual(todo);
    });

    it('delete() removes a todo from useGetAll()', () => {
      const { result } = getTestHarness();

      const todo = Todo.create('test todo');

      act(() => {
        result.current.todoRepository.save(todo);
      });

      expect(result.current.useGetAll[0]).toEqual(todo);

      act(() => {
        result.current.todoRepository.delete(todo.id);
      });

      expect(result.current.useGetAll[0]).toBeUndefined();
    });

    it('deleteAll() removes all todos from useGetAll()', () => {
      const { result } = getTestHarness();

      const todo1 = Todo.create('todo 1');
      const todo2 = Todo.create('todo 2');

      act(() => {
        result.current.todoRepository.save(todo1);
        result.current.todoRepository.save(todo2);
      });

      expect(result.current.useGetAll[0]).toEqual(todo1);
      expect(result.current.useGetAll[1]).toEqual(todo2);

      act(() => {
        result.current.todoRepository.deleteAll();
      });

      expect(result.current.useGetAll).toEqual([]);
    });

    it('update() updates a todo in useGetAll()', () => {
      const { result } = getTestHarness();

      const todo = Todo.create('todo 1');

      act(() => {
        result.current.todoRepository.save(todo);
      });

      expect(result.current.useGetAll[0]?.completedAt).toBeUndefined();

      act(() => {
        result.current.todoRepository.save(todo.complete());
      });

      expect(result.current.useGetAll[0]?.completedAt).not.toBeUndefined();
    });
  });

  describe('getOneById()', () => {
    const getTestHarness = (todoId: string) => {
      const { ReduxWrapper } = getReduxWrapper();
      const useTestHook = () => {
        const todoRepository = useTodoRepository();
        return {
          todoRepository,
          useGetOneById: todoRepositoryReactive.useGetOneById(todoId),
        };
      };
      return renderHook(useTestHook, {
        wrapper: ({ children }: ChildrenProps) => (
          <ReduxWrapper>{children}</ReduxWrapper>
        ),
      });
    };

    it('useGetOneById() is initially undefined', () => {
      const todo = Todo.create('todo 1');
      const { result } = getTestHarness(todo.id);
      expect(result.current.useGetOneById).toBeUndefined();
    });

    it('create() adds a new todo to useGetOneById()', async () => {
      const todo = Todo.create('todo 1');
      const { result } = getTestHarness(todo.id);
      act(() => {
        result.current.todoRepository.save(todo);
      });
      expect(result.current.useGetOneById).toEqual(todo);
    });

    it('delete() removes a todo from useGetOneById()', () => {
      const todo = Todo.create('todo 1');
      const { result } = getTestHarness(todo.id);
      act(() => {
        result.current.todoRepository.save(todo);
      });
      expect(result.current.useGetOneById).toEqual(todo);
      act(() => {
        result.current.todoRepository.delete(todo.id);
      });
      expect(result.current.useGetOneById).toBeUndefined();
    });

    it('deleteAll() removes all todos from useGetOneById()', () => {
      const todo1 = Todo.create('todo 1');
      const todo2 = Todo.create('todo 2');
      const { result } = getTestHarness(todo1.id);
      act(() => {
        result.current.todoRepository.save(todo1);
        result.current.todoRepository.save(todo2);
      });
      expect(result.current.useGetOneById).toEqual(todo1);
      act(() => {
        result.current.todoRepository.deleteAll();
      });
      expect(result.current.useGetOneById).toBeUndefined();
    });

    it('update() updates a todo in useGetOneById()', () => {
      const todo = Todo.create('todo 1');
      const { result } = getTestHarness(todo.id);
      act(() => {
        result.current.todoRepository.save(todo);
      });
      expect(result.current.useGetOneById?.completedAt).toBeUndefined();
      act(() => {
        result.current.todoRepository.save(todo.complete());
      });
      expect(result.current.useGetOneById?.completedAt).not.toBeUndefined();
    });
  });
});
