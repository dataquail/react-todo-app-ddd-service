import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { renderHook, waitFor } from '@testing-library/react';
import { InjectionSymbol, type InjectionType } from 'src/core/global/types';
import { appContainer } from 'src/core/global/appContainer';
import { mockGetAllActiveTodos } from 'src/__test__/network/activeTodo/mockGetAllActiveTodos';
import { mockCreateOneActiveTodo } from 'src/__test__/network/activeTodo/mockCreateOneActiveTodo';
import { mockDeleteOneActiveTodo } from 'src/__test__/network/activeTodo/mockDeleteOneActiveTodo';
import { mockCompleteOneActiveTodo } from 'src/__test__/network/activeTodo/mockCompleteOneActiveTodo';
import { mockUncompleteOneActiveTodo } from 'src/__test__/network/activeTodo/mockUncompleteOneActiveTodo';
import { getTestWrapper } from 'src/__test__/getTestWrapper';

describe('ActiveTodoServiceImpl', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const nowTimeStamp = new Date().toISOString();

  const getActiveTodoService = () => {
    return appContainer.get<InjectionType<'ActiveTodoService'>>(
      InjectionSymbol('ActiveTodoService'),
    );
  };

  const withOneUncompletedActiveTodo = () => {
    mockGetAllActiveTodos(server, {
      total_count: 1,
      list: [
        {
          id: '1',
          title: 'Active Todo 1',
          created_at: nowTimeStamp,
          completed_at: null,
        },
      ],
    });
  };

  const withOneCompletedActiveTodo = () => {
    mockGetAllActiveTodos(server, {
      total_count: 1,
      list: [
        {
          id: '1',
          title: 'Active Todo 1',
          created_at: nowTimeStamp,
          completed_at: nowTimeStamp,
        },
      ],
    });
  };

  const withNoActiveTodos = () => {
    mockGetAllActiveTodos(server, {
      total_count: 0,
      list: [],
    });
  };

  const withSuccessfullyCreatedActiveTodo = () =>
    mockCreateOneActiveTodo(server, {
      id: '1',
    });

  const withSuccessfullyDeletedActiveTodo = () =>
    mockDeleteOneActiveTodo(server, { message: 'success' });

  const withSuccessfullyCompletedActiveTodo = () =>
    mockCompleteOneActiveTodo(server, { message: 'success' });

  const withSuccessfullyUncompletedActiveTodo = () =>
    mockUncompleteOneActiveTodo(server, { message: 'success' });

  it('gets all', async () => {
    withOneUncompletedActiveTodo();
    const activeTodoService = getActiveTodoService();
    const allActiveTodos = await activeTodoService.getAll.call();
    expect(allActiveTodos.length).toBe(1);
    expect(allActiveTodos[0].id).toBe('1');
    expect(allActiveTodos[0].title).toBe('Active Todo 1');
    expect(allActiveTodos[0].createdAt.toISOString()).toBe(nowTimeStamp);
    expect(allActiveTodos[0].completedAt).toBeUndefined();
  });

  it('forces refetch for getAll', async () => {
    withOneUncompletedActiveTodo();
    const activeTodoService = getActiveTodoService();
    expect((await activeTodoService.getAll.call()).length).toBe(1);
    expect((await activeTodoService.getAll.call()).length).toBe(1);
    withNoActiveTodos();
    expect(
      (await activeTodoService.getAll.call({ options: { forceRefetch: true } }))
        .length,
    ).toBe(0);
    expect(
      (await activeTodoService.getAll.call({ options: { forceRefetch: true } }))
        .length,
    ).toBe(0);
  });

  it('creates one', async () => {
    const activeTodoService = getActiveTodoService();
    withNoActiveTodos();
    expect((await activeTodoService.getAll.call()).length).toBe(0);
    withSuccessfullyCreatedActiveTodo();
    const createActiveTodoResponse = await activeTodoService.createOne.call({
      title: 'Active Todo 1',
    });
    expect(createActiveTodoResponse.id).toBe('1');
    withOneUncompletedActiveTodo();
    expect((await activeTodoService.getAll.call()).length).toBe(1);
  });

  it('deletes one', async () => {
    const activeTodoService = getActiveTodoService();
    withOneUncompletedActiveTodo();
    expect((await activeTodoService.getAll.call()).length).toBe(1);
    withSuccessfullyDeletedActiveTodo();
    withNoActiveTodos();
    await activeTodoService.deleteOne.call({ id: '1' });
    expect((await activeTodoService.getAll.call()).length).toBe(0);
  });

  it('completes one', async () => {
    const activeTodoService = getActiveTodoService();
    withOneUncompletedActiveTodo();
    expect((await activeTodoService.getAll.call()).length).toBe(1);
    withSuccessfullyCompletedActiveTodo();
    withOneCompletedActiveTodo();
    await activeTodoService.completeOne.call({ id: '1' });
    expect((await activeTodoService.getAll.call()).length).toBe(1);
    expect(
      (await activeTodoService.getAll.call())[0].completedAt?.toISOString(),
    ).toBe(nowTimeStamp);
  });

  it('uncompletes one', async () => {
    const activeTodoService = getActiveTodoService();
    withOneCompletedActiveTodo();
    expect((await activeTodoService.getAll.call()).length).toBe(1);
    withSuccessfullyUncompletedActiveTodo();
    await activeTodoService.uncompleteOne.call({ id: '1' });
    withOneUncompletedActiveTodo();
    expect((await activeTodoService.getAll.call()).length).toBe(1);
    expect(
      (await activeTodoService.getAll.call())[0].completedAt,
    ).toBeUndefined();
  });

  it('prioritizes the completed todos', async () => {
    const activeTodoService = getActiveTodoService();
    withOneUncompletedActiveTodo();
    const allActiveTodos = await activeTodoService.getAll.call();
    expect(allActiveTodos.length).toBe(1);
    expect(allActiveTodos[0].id).toBe('1');
    expect(allActiveTodos[0].title).toBe('Active Todo 1');
    expect(allActiveTodos[0].createdAt.toISOString()).toBe(nowTimeStamp);
    expect(allActiveTodos[0].completedAt).toBeUndefined();
    expect(allActiveTodos[0].isPrioritized).toBe(false);

    activeTodoService.prioritize({ id: '1' });
    const allActiveTodosAfterPrioritization =
      await activeTodoService.getAll.call();
    expect(allActiveTodosAfterPrioritization.length).toBe(1);
    expect(allActiveTodosAfterPrioritization[0].isPrioritized).toBe(true);
  });

  it('deprioritizes the completed todos', async () => {
    const activeTodoService = getActiveTodoService();
    withOneUncompletedActiveTodo();
    const allActiveTodos = await activeTodoService.getAll.call();
    expect(allActiveTodos.length).toBe(1);
    expect(allActiveTodos[0].isPrioritized).toBe(false);

    activeTodoService.prioritize({ id: '1' });
    const allActiveTodosAfterPrioritization =
      await activeTodoService.getAll.call();
    expect(allActiveTodosAfterPrioritization.length).toBe(1);
    expect(allActiveTodosAfterPrioritization[0].isPrioritized).toBe(true);

    activeTodoService.deprioritize({ id: '1' });
    const allActiveTodosAfterDeprioritization =
      await activeTodoService.getAll.call();
    expect(allActiveTodosAfterDeprioritization.length).toBe(1);
    expect(allActiveTodosAfterDeprioritization[0].isPrioritized).toBe(false);
  });

  describe('hooks', () => {
    it('getAll.useQuery', async () => {
      withOneUncompletedActiveTodo();
      const activeTodoService = getActiveTodoService();
      const useQuery = renderHook(activeTodoService.getAll.useQuery, {
        wrapper: getTestWrapper(),
      });
      expect(useQuery.result.current.isPending).toBe(true);
      expect(useQuery.result.current.isSuccess).toBe(false);
      await waitFor(() =>
        expect(useQuery.result.current.isPending).toBe(false),
      );
      expect(useQuery.result.current.isSuccess).toBe(true);
      expect(useQuery.result.current.data?.length).toBe(1);
    });

    it('getAll.useQuery with enabled', async () => {
      withOneUncompletedActiveTodo();
      const activeTodoService = getActiveTodoService();
      const { result, rerender } = renderHook(
        activeTodoService.getAll.useQuery,
        {
          wrapper: getTestWrapper(),
          initialProps: { options: { enabled: false } },
        },
      );
      expect(result.current.isPending).toBe(true);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.data).toEqual([]);

      rerender({ options: { enabled: true } });

      await waitFor(() => expect(result.current.isPending).toBe(false));
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data?.length).toBe(1);
    });
  });
});
