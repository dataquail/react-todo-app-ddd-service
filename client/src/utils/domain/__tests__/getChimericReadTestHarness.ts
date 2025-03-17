import { waitFor, renderHook } from '@testing-library/react';
import { ChimericRead } from '../ChimericRead';
import { checkOnInterval } from './checkOnInterval';
import { ReactNode } from 'react';

export const ChimericReadMethods = ['call', 'use'] as const;

export const inferQueryMethod = (method: string) => {
  if (method === 'call') {
    return 'call';
  }
  return 'useQuery';
};

export const getChimericReadTestHarness =
  (testWrapper: ({ children }: { children: ReactNode }) => JSX.Element) =>
  <
    TService extends {
      [key in TMethod]: ChimericRead<
        (
          ...args: Parameters<TService[key]['call']>
        ) => ReturnType<TService[key]['call']>
      >;
    },
    TMethod extends keyof TService,
    TChimericMethod extends (typeof ChimericReadMethods)[number],
    TArgs extends Parameters<TService[TMethod]['call']> = Parameters<
      TService[TMethod]['call']
    >,
  >(
    service: TService,
    method: TMethod,
    chimericMethod: TChimericMethod,
    args?: TArgs,
  ): {
    waitFor: (cb: () => boolean) => Promise<void>;
    result: {
      current: ReturnType<TService[TMethod]['call']> | undefined;
    };
  } => {
    let result = {
      current: undefined as ReturnType<TService[TMethod]['call']> | undefined,
    };
    if (chimericMethod === 'call') {
      result.current = service[method].call(...((args ?? []) as any));
      return {
        waitFor: async (cb: () => boolean) => {
          result.current = service[method].call(...((args ?? []) as any));
          return new Promise<void>(async (resolve) => {
            await checkOnInterval(() => cb(), 100, 5000, resolve);
          });
        },
        result,
      };
    } else {
      const hook = renderHook(
        () => service[method].use(...((args ?? []) as any)),
        {
          wrapper: testWrapper,
        },
      );
      return {
        waitFor: async (cb: () => boolean) => {
          await waitFor(() => cb());
        },
        result: hook.result,
      };
    }
  };
