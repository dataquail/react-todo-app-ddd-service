import { ExtractChimericParameter, ExtractChimericReturnType } from './utils';

export type ChimericAsyncRead<
  TParams,
  TResult,
  E extends Error,
  ErrorHelpers = void extends { [K: string]: (error: unknown) => boolean }
    ? never
    : object,
> = {
  call: (args: TParams) => Promise<TResult>;
  useAsync: () => {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: E | null;
    data: TResult | undefined;
  };
  errorHelpers: ErrorHelpers;
};

export type ChimericAsyncReadFactory<
  T extends (
    args: Parameters<T>[0],
  ) => ReturnType<T> extends Promise<infer R> ? Promise<R> : never,
  E extends Error,
  ErrorHelpers = void extends { [K: string]: (error: unknown) => boolean }
    ? never
    : object,
> = ChimericAsyncRead<
  ExtractChimericParameter<T>,
  ExtractChimericReturnType<T>,
  E,
  ErrorHelpers
>;
