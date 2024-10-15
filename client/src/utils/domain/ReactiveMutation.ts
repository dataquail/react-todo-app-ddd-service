export type ReactiveMutation<
  T extends (...args: Parameters<T>) => ReturnType<T>,
  E extends Error,
  ErrorHelpers = void extends { [K: string]: (error: unknown) => boolean }
    ? never
    : object,
> = {
  mutateAsync: T;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: E | null;
  data: Awaited<ReturnType<T>> | undefined;
  errorHelpers: ErrorHelpers;
};
