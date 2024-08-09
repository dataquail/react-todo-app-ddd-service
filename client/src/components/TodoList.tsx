import { Flex, Loader, ScrollArea } from '@mantine/core';
import { useTodoService } from 'src/modules/todo/infrastructure/services/TodoService/DI';
import { TodoCard } from './TodoCard';

export const TodoList = () => {
  const { isPending, data } = useTodoService().getAll.useQuery();

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
