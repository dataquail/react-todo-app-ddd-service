import {
  Box,
  Checkbox,
  Group,
  Loader,
  Menu,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { format } from 'date-fns';
import {
  IconDots,
  IconStar,
  IconStarFilled,
  IconTrash,
} from '@tabler/icons-react';
import { ActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { useActiveTodoService } from 'src/modules/todo/infrastructure/services/ServiceProvider';

export const TodoCard = ({ todo }: { todo: ActiveTodo }) => {
  const activeTodoService = useActiveTodoService();

  return (
    <Box key={todo.id} p="xs" pr="lg">
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Card
          radius="md"
          checked={Boolean(todo.completedAt)}
          disabled={activeTodoService.deleteOne.isPending}
          onClick={() => {
            const isCompleted = Boolean(todo.completedAt);
            if (isCompleted) {
              activeTodoService.uncompleteOne.mutateAsync(todo.id);
            } else {
              activeTodoService.completeOne.mutateAsync(todo.id);
            }
          }}
        >
          <Group wrap="nowrap" align="flex-start">
            {activeTodoService.deleteOne.isPending ||
            activeTodoService.completeOne.isPending ||
            activeTodoService.uncompleteOne.isPending ? (
              <Loader p="xs" />
            ) : (
              <Checkbox.Indicator mt="sm" ml="sm" />
            )}
            <Stack p="xs" align="stretch" gap="xs">
              <Title order={4}>{todo.title}</Title>
              <Text size="sm">{`Created At: ${format(todo.createdAt, 'M/d/yyyy h:m aaa')}`}</Text>
              <Text size="sm">{`Completed At: ${todo.completedAt ? format(todo.completedAt, 'M/d/yyyy h:m aaa') : 'N/A'}`}</Text>
            </Stack>
            {todo.isPrioritized && (
              <Box style={{ flexGrow: 1 }} p="xs">
                <IconStarFilled
                  style={{
                    width: rem(20),
                    height: rem(20),
                    position: 'absolute',
                    right: rem(70),
                  }}
                />
              </Box>
            )}
          </Group>
        </Checkbox.Card>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDots />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Todo Options</Menu.Label>
            <Menu.Item
              color="red"
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={() => activeTodoService.deleteOne.mutateAsync(todo.id)}
            >
              Delete
            </Menu.Item>
            {todo.isPrioritized ? (
              <Menu.Item
                leftSection={
                  <IconStar style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => activeTodoService.deprioritize(todo.id)}
              >
                Deprioritize
              </Menu.Item>
            ) : (
              <Menu.Item
                leftSection={
                  <IconStarFilled style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => activeTodoService.prioritize(todo.id)}
              >
                Prioritize
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  );
};
