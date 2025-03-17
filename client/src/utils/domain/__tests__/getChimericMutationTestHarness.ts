import { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { ChimericMutation } from '../ChimericMutation';
import { checkOnInterval } from './checkOnInterval';

export const ChimericMutationMethods = ['call', 'useMutation'] as const;

export const inferMutationMethod = (method: string) => {
  if (method === 'call') {
    return 'call';
  }
  return 'useMutation';
};

export const getChimericMutationTestHarness =
  (testWrapper: ({ children }: { children: ReactNode }) => JSX.Element) =>
  <
    TChimericMethod extends (typeof ChimericMutationMethods)[number],
    TMethod extends keyof TService,
    TService extends {
      [key in TMethod]: ChimericMutation<
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
    if (chimericMethod === 'call') {
      return {
        call: (args: TArgs) => {
          result.current.isPending = true;
          result.current.isSuccess = false;
          result.current.isError = false;
          result.current.error = null;
          const promise = service[method].call(args as any);
          promise
            .then((data) => {
              result.current.data = data;
              result.current.isPending = false;
              result.current.isSuccess = true;
              result.current.isError = false;
              result.current.error = null;
            })
            .catch((error) => {
              result.current.isPending = false;
              result.current.isSuccess = false;
              result.current.isError = true;
              result.current.error = error as Error;
            });

          return promise;
        },
        waitForSuccess: async () => {
          return new Promise<void>(async (resolve) => {
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
      const hook = renderHook(() => service[method].useMutation(), {
        wrapper: testWrapper,
      });
      return {
        call: hook.result.current.call,
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
