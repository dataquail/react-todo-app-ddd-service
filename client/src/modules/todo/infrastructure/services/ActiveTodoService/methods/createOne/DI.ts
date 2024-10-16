import { QueryClient, useMutation } from '@tanstack/react-query';
import { CreateOne } from '.';
import { createActiveTodo } from '../../network/createActiveTodo';
import { networkQueryKeys } from 'src/utils/network/networkQueryKeys';
import { Injectable } from 'react-obsidian';
import { ApplicationGraph } from 'src/api/global/ApplicationGraph';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';

@Injectable(ApplicationGraph)
export class CreateOneGraph {
  private useMutation: IActiveTodoService['createOne']['useMutation'];

  constructor(queryClient: QueryClient) {
    const createOneServiceMethod = CreateOne(createActiveTodo);
    this.useMutation = () =>
      useMutation({
        mutationKey: [networkQueryKeys.CREATE_TODO],
        mutationFn: createOneServiceMethod,
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [networkQueryKeys.GET_TODO_LIST],
          });
        },
      });
  }

  public useMutationCreateOne(): IActiveTodoService['createOne'] {
    const callAsync = this.useMutation().mutateAsync;
    return {
      callAsync,
      useMutation: this.useMutation,
      errorHelpers: {},
    };
  }
}
