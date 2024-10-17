export type ReactiveQuery<
  T extends (args: Parameters<T>[0]) => ReturnType<T>,
  E extends Error,
  ErrorHelpers = void extends { [K: string]: (error: unknown) => boolean }
    ? never
    : object,
> = {
  queryAsync: (
    args: Parameters<T>[0] extends void
      ? { forceRefetch: boolean } | void
      : Parameters<T>[0] & { forceRefetch?: boolean },
  ) => ReturnType<T>;
  useQuery: (
    args: Parameters<T>[0] extends void
      ? { enabled: boolean } | void
      : Parameters<T>[0] & { enabled?: boolean },
  ) => {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: E | null;
    data: Awaited<ReturnType<T>> | undefined;
  };
  errorHelpers: ErrorHelpers;
};
