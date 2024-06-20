export type InvokableReactive<
  T extends (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>,
  E = Error | null | unknown,
> = {
  invoke: T;
  data: Awaited<ReturnType<T>> | undefined;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: E;
};
