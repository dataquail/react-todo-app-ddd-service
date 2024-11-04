import { QueryClient } from '@tanstack/react-query';

export interface IQueryClient {
  fetchQuery: QueryClient['fetchQuery'];
  invalidateQueries: QueryClient['invalidateQueries'];
  instance: QueryClient;
}
