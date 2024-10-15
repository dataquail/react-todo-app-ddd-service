/**
 * call: function that returns JIT value from the reactive data store
 * use: hook to be used in react components to rerender when the reactive data store changes
 */

export type Reactive<T extends (...args: Parameters<T>) => ReturnType<T>> = {
  call: T;
  use: T;
};
