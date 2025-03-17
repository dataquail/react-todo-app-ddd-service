import { waitFor, renderHook } from '@testing-library/react';
import { ChimericQuery } from '../ChimericQuery';
import { checkOnInterval } from './checkOnInterval';
import { ReactNode } from 'react';

export const ChimericQueryMethods = ['call', 'useQuery'] as const;

export const inferQueryMethod = (method: string) => {
  if (method === 'call') {
    return 'call';
  }
  return 'useQuery';
};

export const getChimericQueryTestHarness =
  (testWrapper: ({ children }: { children: ReactNode }) => JSX.Element) =>
  <
    TChimericMethod extends (typeof ChimericQueryMethods)[number],
    TMethod extends keyof TService,
    TService extends {
      [key in TMethod]: ChimericQuery<
        Parameters<TService[TMethod]['call']>[0],
        Awaited<ReturnType<TService[TMethod]['call']>>,
        Error,
        TService[TMethod]['errorHelpers']
      >;
    },
    TArgs extends Parameters<TService[TMethod]['call']>[0] = Parameters<
      TService[TMethod]['call']
    >[0],
  >(
    chimericMethod: TChimericMethod,
    method: TMethod,
    service: TService,
    args?: TArgs,
  ) => {
    let result = {
      current: {
        data: undefined as
          | Awaited<ReturnType<TService[TMethod]['call']>>
          | undefined,
        isSuccess: false,
        isPending: true,
        isError: false,
        error: null as Error | null,
      },
    };
    let promiseStatus = 'initial' as
      | 'initial'
      | 'pending'
      | 'resolved'
      | 'rejected';
    if (chimericMethod === 'call') {
      result.current.isPending = true;
      let promise = service[method].call(args as any);
      promiseStatus = 'pending';
      promise
        .then((data) => {
          result.current.data = data;
          result.current.isPending = false;
          result.current.isSuccess = true;
          result.current.isError = false;
          result.current.error = null;
          promiseStatus = 'resolved';
        })
        .catch((error) => {
          result.current.isPending = false;
          result.current.isSuccess = false;
          result.current.isError = true;
          result.current.error = error as Error;
          promiseStatus = 'rejected';
        });

      return {
        waitForSuccess: async () => {
          return new Promise<void>(async (resolve) => {
            if (promiseStatus === 'resolved') {
              // retry promise if it has already been resolved
              promise = service[method].call(args as any);
              promiseStatus = 'pending';
              promise
                .then((data) => {
                  result.current.data = data;
                  result.current.isPending = false;
                  result.current.isSuccess = true;
                  result.current.isError = false;
                  result.current.error = null;
                  promiseStatus = 'resolved';
                })
                .catch((error) => {
                  result.current.isPending = false;
                  result.current.isSuccess = false;
                  result.current.isError = true;
                  result.current.error = error as Error;
                  promiseStatus = 'rejected';
                });
            }
            await promise;
            await checkOnInterval(
              () => result.current.isSuccess,
              100,
              5000,
              resolve,
            );
          });
        },
        waitForError: async () => {
          return new Promise<void>(async (resolve) => {
            await promise;
            await checkOnInterval(
              () => result.current.isError,
              100,
              5000,
              resolve,
            );
          });
        },
        waitForPending: async () => {
          return new Promise<void>(async (resolve) => {
            await checkOnInterval(
              () => result.current.isPending,
              100,
              5000,
              resolve,
            );
          });
        },
        result,
      };
    } else {
      const hook = renderHook(() => service[method].useQuery(args as any), {
        wrapper: testWrapper,
      });
      return {
        waitForSuccess: async () => {
          await waitFor(() => expect(hook.result.current.isSuccess).toBe(true));
        },
        waitForError: async () => {
          await waitFor(() => expect(hook.result.current.isError).toBe(true));
        },
        waitForPending: async () => {
          await waitFor(() => expect(hook.result.current.isPending).toBe(true));
        },
        result: hook.result,
      };
    }
  };
