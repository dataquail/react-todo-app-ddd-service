export type ExtractChimericParameter<T> = T extends (...args: infer U) => any
  ? U[0] extends undefined
    ? void
    : U[0]
  : void;

export type ExtractChimericReturnType<T> = T extends (
  ...args: any[]
) => Promise<infer R>
  ? R
  : never;
