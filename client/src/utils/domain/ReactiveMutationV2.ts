export type ReactiveMutationV2<
  T extends (...args: Parameters<T>) => ReturnType<T>,
  E extends Error,
  ErrorHelpers = void extends { [K: string]: (error: unknown) => boolean }
    ? never
    : object,
> = {
  callAsync: T;
  useMutation: () => {
    mutateAsync: T;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: E | null;
    data: Awaited<ReturnType<T>> | undefined;
  };
  errorHelpers: ErrorHelpers;
};
