import { Flex, Loader, ScrollArea } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { TodoCard } from './TodoCard';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { injectComponent } from 'src/utils/inversify/injectComponent';
import { appContainer } from 'src/modules/global/appContainer';
import { TODO_SERVICE_TYPES } from 'src/modules/todo/domain/services/types';

type InjectedProps = {
  activeTodoService: IActiveTodoService;
};

const _TodoList = ({ activeTodoService }: InjectedProps) => {
  const { data, isPending } = activeTodoService.getAll.useQuery();
  const { height } = useViewportSize();
  console.log(data, 'data');

  if (isPending || !data) {
    return (
      <Flex justify="center" align="center" w="100%" h="100%">
        <Loader />
      </Flex>
    );
  }

  return (
    <ScrollArea.Autosize mah={`calc(${height}px - 172px`}>
      {data.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </ScrollArea.Autosize>
  );
};

export const TodoList = injectComponent<InjectedProps>(
  _TodoList,
  appContainer,
  { activeTodoService: TODO_SERVICE_TYPES.ActiveTodoService },
);
