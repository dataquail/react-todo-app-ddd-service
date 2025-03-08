import { QueryClient, useQuery } from '@tanstack/react-query';

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

export const makeReactiveQuery = <
  T extends (args: Parameters<T>[0]) => ReturnType<T>,
  E extends Error,
  ErrorHelpers = void extends { [K: string]: (error: unknown) => boolean }
    ? never
    : object,
>({
  queryClient,
  queryFn,
  errorHelpers,
}: {
  queryClient: QueryClient;
  queryFn: T;
  errorHelpers: ErrorHelpers;
}) => {
  return ({
    getQueryKey,
    getFromStore,
    useFromStore = () => ({}) as Awaited<ReturnType<T>>,
  }: {
    getQueryKey: (args: Parameters<T>[0]) => string[];
    getFromStore?: T;
    useFromStore?: (args: Parameters<T>[0]) => Awaited<ReturnType<T>>;
  }): ReactiveQuery<T, E, ErrorHelpers> => {
    return {
      queryAsync: (args) => {
        // work around for typing issue with ReactiveQuery queryAsync returning a promise
        const promise = (async () => {
          if (args?.forceRefetch) {
            await queryClient.invalidateQueries({
              queryKey: getQueryKey(args),
            });
          }
          await queryClient.fetchQuery({
            queryKey: getQueryKey(args),
            queryFn: () => queryFn(args),
          });
        }) as unknown as () => ReturnType<T>;
        const promiseResult = promise();
        if (getFromStore) {
          return getFromStore(args);
        } else {
          return promiseResult;
        }
      },
      useQuery: (args) => {
        const resultFromStore = useFromStore(args);
        const { isPending, isSuccess, isError, error, data } = useQuery<
          ReturnType<T>,
          E,
          Awaited<ReturnType<T>>,
          string[]
        >({
          queryKey: getQueryKey(args),
          queryFn: () => queryFn(args),
          enabled: args?.enabled,
        });

        return {
          isPending,
          isSuccess,
          isError,
          error,
          data: resultFromStore || data,
        };
      },
      errorHelpers,
    };
  };
};
