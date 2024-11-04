import { Flex, Loader, ScrollArea } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { TodoCard } from './TodoCard';
import { activeTodoService } from 'src/inversify.config';

export const TodoList = () => {
  const { data, isPending } = activeTodoService.getAll.useQuery();
  const { height } = useViewportSize();

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
