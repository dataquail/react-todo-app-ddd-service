import { Flex, Loader, ScrollArea } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { TodoCard } from './TodoCard';
import { useActiveTodoService } from 'src/modules/todo/infrastructure/services/ActiveTodoService/DI';

export const TodoList = () => {
  const activeTodoService = useActiveTodoService();
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
