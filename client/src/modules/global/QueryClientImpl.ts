import { injectable } from 'inversify';
import { IQueryClient } from './IQueryClient';
import { QueryClient } from '@tanstack/react-query';

@injectable()
export class QueryClientImpl implements IQueryClient {
  public instance: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });

  public fetchQuery = this.instance.fetchQuery.bind(this.instance);

  public invalidateQueries = this.instance.invalidateQueries.bind(
    this.instance,
  );
}
