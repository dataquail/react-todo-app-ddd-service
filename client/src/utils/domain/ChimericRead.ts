export type ChimericRead<T extends (...args: Parameters<T>) => ReturnType<T>> =
  {
    call: T;
    use: T;
  };
