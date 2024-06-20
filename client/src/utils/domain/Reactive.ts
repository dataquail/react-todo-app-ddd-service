export type Reactive<T, E = Error | null> = {
  data: T;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: E;
};
