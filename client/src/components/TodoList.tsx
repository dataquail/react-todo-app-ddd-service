import { Flex, Loader, ScrollArea } from '@mantine/core';
import { TodoCard } from './TodoCard';
import { useActiveTodoService } from 'src/modules/todo/infrastructure/services/ServiceProvider';

export const TodoList = () => {
  const { isPending, data } = useActiveTodoService().getAll.useQuery();

  if (isPending || !data) {
    return (
      <Flex justify="center" align="center" w="100%" h="100%">
        <Loader />
      </Flex>
    );
  }

  return (
    <ScrollArea.Autosize w="60%" mah={700}>
      {data.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </ScrollArea.Autosize>
  );
};
