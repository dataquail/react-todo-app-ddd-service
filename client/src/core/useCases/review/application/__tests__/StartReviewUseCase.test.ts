import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { act } from '@testing-library/react';
import { InjectionSymbol, type InjectionType } from 'src/core/global/types';
import { appContainer } from 'src/core/global/appContainer';
import { mockGetAllActiveTodos } from 'src/__test__/network/activeTodo/mockGetAllActiveTodos';
import { getTestWrapper } from 'src/__test__/getTestWrapper';
import {
  ChimericPromiseMethods,
  getChimericPromiseTestHarness,
} from 'src/utils/domain/__tests__/getChimericPromiseTestHarness';
import { mockGetAllSavedForLaterTodos } from 'src/__test__/network/savedForLaterTodo/mockGetAllSavedForLaterTodos';
import {
  getChimericReadTestHarness,
  inferReadMethod,
} from 'src/utils/domain/__tests__/getChimericReadTestHarness';

describe('StartReviewUseCase', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const nowTimeStamp = new Date().toISOString();

  const getStartReviewUseCase = () => {
    return appContainer.get<InjectionType<'StartReviewUseCase'>>(
      InjectionSymbol('StartReviewUseCase'),
    );
  };

  const getReviewRepository = () => {
    return appContainer.get<InjectionType<'IReviewRepository'>>(
      InjectionSymbol('IReviewRepository'),
    );
  };

  const withOneUncompletedAndOneCompletedActiveTodoInList = () => {
    mockGetAllActiveTodos(server, {
      total_count: 1,
      list: [
        {
          id: '1',
          title: 'Active Todo 1',
          created_at: nowTimeStamp,
          completed_at: null,
        },
        {
          id: '2',
          title: 'Active Todo 2',
          created_at: nowTimeStamp,
          completed_at: nowTimeStamp,
        },
      ],
    });
  };

  const withOneSavedForLaterTodoInList = () => {
    mockGetAllSavedForLaterTodos(server, {
      total_count: 1,
      list: [
        {
          id: '3',
          title: 'Saved For Later Todo 3',
          created_at: nowTimeStamp,
        },
      ],
    });
  };

  it.each(ChimericPromiseMethods)('startReview.%s', async (chimericMethod) => {
    withOneUncompletedAndOneCompletedActiveTodoInList();
    withOneSavedForLaterTodoInList();
    const startReviewHarness = getChimericPromiseTestHarness(getTestWrapper())(
      getStartReviewUseCase(),
      chimericMethod,
    );
    const getReviewHarness = getChimericReadTestHarness(getTestWrapper())(
      getReviewRepository().get,
      inferReadMethod(chimericMethod),
    );

    expect(startReviewHarness.result?.current.isPending).toBe(false);
    expect(startReviewHarness.result?.current.isSuccess).toBe(false);

    act(() => {
      startReviewHarness.result?.current.call();
    });

    await startReviewHarness.waitForSuccess();
    await getReviewHarness.waitFor(
      () => getReviewHarness.result.current !== undefined,
    );
    // omits completed activeTodo 2
    expect(getReviewHarness.result.current?.todoIdList).toEqual(['1', '3']);
  });
});
