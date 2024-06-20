import { ITodoRepositoryReactive } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { useGetAllReduxImpl } from './reduxImpl/useGetAllReduxImpl';
import { useGetOneByIdReduxImpl } from './reduxImpl/useGetOneByIdReduxImpl';

export const todoRepositoryReactive: ITodoRepositoryReactive = {
  useGetAll: useGetAllReduxImpl,
  useGetOneById: useGetOneByIdReduxImpl,
};
