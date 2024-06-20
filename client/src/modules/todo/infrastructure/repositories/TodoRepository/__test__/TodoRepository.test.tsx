import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { useTodoRepository } from '../DI';
import { Todo } from 'src/modules/todo/domain/Todo';
import { getReduxWrapper } from 'src/__test__/getReduxWrapper';

type ChildrenProps = {
  children: ReactNode;
};

describe('TodoRepository', () => {
  const getTestHarness = () => {
    const { ReduxWrapper } = getReduxWrapper();
    return renderHook(useTodoRepository, {
      wrapper: ({ children }: ChildrenProps) => (
        <ReduxWrapper>{children}</ReduxWrapper>
      ),
    });
  };

  it('getAll() is initially empty', () => {
    const { result } = getTestHarness();

    expect(result.current.getAll()).toEqual([]);
  });

  it('create() adds a new todo', async () => {
    const { result } = getTestHarness();

    const todo = Todo.create('test todo');

    act(() => {
      result.current.save(todo);
    });

    expect(result.current.getOneById(todo.id)).toEqual(todo);
  });

  it('delete() removes a todo', () => {
    const { result } = getTestHarness();

    const todo = Todo.create('test todo');

    act(() => {
      result.current.save(todo);
    });

    expect(result.current.getOneById(todo.id)).toEqual(todo);

    act(() => {
      result.current.delete(todo.id);
    });

    expect(result.current.getOneById(todo.id)).toBeUndefined();
  });

  it('deleteAll() removes all todos', () => {
    const { result } = getTestHarness();

    const todo1 = Todo.create('todo 1');
    const todo2 = Todo.create('todo 2');

    act(() => {
      result.current.save(todo1);
      result.current.save(todo2);
    });

    expect(result.current.getOneById(todo1.id)).toEqual(todo1);
    expect(result.current.getOneById(todo2.id)).toEqual(todo2);

    act(() => {
      result.current.deleteAll();
    });

    expect(result.current.getOneById(todo1.id)).toBeUndefined();
    expect(result.current.getOneById(todo2.id)).toBeUndefined();
  });

  it('update() updates a todo', () => {
    const { result } = getTestHarness();

    const todo = Todo.create('todo 1');

    act(() => {
      result.current.save(todo);
    });

    expect(result.current.getOneById(todo.id)).toEqual(todo);
    expect(result.current.getOneById(todo.id)?.completedAt).toBeUndefined();

    act(() => {
      result.current.save(todo.complete());
    });

    expect(result.current.getOneById(todo.id)?.completedAt).not.toBeUndefined();
  });
});
