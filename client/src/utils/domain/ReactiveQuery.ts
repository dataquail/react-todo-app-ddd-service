export type ReactiveQuery<
  T extends (args: Parameters<T>[0]) => ReturnType<T>,
  E extends Error,
  ErrorHelpers = void extends { [K: string]: (error: unknown) => boolean }
    ? never
    : object,
> = {
  queryAsync: (
    args: Parameters<T>[0] extends void
      ? { forceRefetch?: boolean } | undefined
      : Parameters<T>[0] & { forceRefetch?: boolean },
  ) => ReturnType<T>;
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
