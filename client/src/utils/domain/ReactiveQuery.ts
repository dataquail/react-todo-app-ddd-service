export type ReactiveQuery<
  T extends (...args: Parameters<T>) => ReturnType<T>,
  E extends Error,
  ErrorHelpers = void extends { [K: string]: (error: unknown) => boolean }
    ? never
    : object,
> = {
  queryAsync: T;
  useMeta: (...args: Parameters<T>) => {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: E | null;
    data: Awaited<ReturnType<T>> | undefined;
  };
  useQuery: (...args: Parameters<T>) => {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: E | null;
    data: Awaited<ReturnType<T>> | undefined;
  };
  errorHelpers: ErrorHelpers;
};
