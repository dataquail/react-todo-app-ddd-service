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
  IconPlus,
  IconStar,
  IconStarFilled,
  IconTrash,
} from '@tabler/icons-react';
import { ActiveTodo } from 'src/modules/todo/domain/ActiveTodo';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { injectComponent } from 'src/utils/inversify/injectComponent';
import { appContainer } from 'src/modules/global/appContainer';
import { TODO_SERVICE_TYPES } from 'src/modules/todo/domain/services/types';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';

type InjectedProps = {
  activeTodoService: IActiveTodoService;
  savedForLaterTodoService: ISavedForLaterTodoService;
};

type OwnProps = {
  todo: ActiveTodo;
};

const _TodoCard = ({
  todo,
  activeTodoService,
  savedForLaterTodoService,
}: InjectedProps & OwnProps) => {
  const completeOneMutation = activeTodoService.completeOne.useMutation();
  const uncompleteOneMutation = activeTodoService.uncompleteOne.useMutation();
  const deleteOneMutation = activeTodoService.deleteOne.useMutation();
  const saveForLaterMutation =
    savedForLaterTodoService.saveForLater.useMutation();

  return (
    <Box key={todo.id} p="xs" pr="lg">
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Card
          radius="md"
          checked={Boolean(todo.completedAt)}
          disabled={deleteOneMutation.isPending}
          onClick={() => {
            const isCompleted = Boolean(todo.completedAt);
            if (isCompleted) {
              uncompleteOneMutation.mutateAsync(todo.id);
            } else {
              completeOneMutation.mutateAsync(todo.id);
            }
          }}
        >
          <Group wrap="nowrap" align="flex-start">
            {deleteOneMutation.isPending ||
            completeOneMutation.isPending ||
            uncompleteOneMutation.isPending ? (
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
            <Menu.Item
              leftSection={
                <IconPlus style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={() =>
                saveForLaterMutation.mutateAsync({
                  activeTodoId: todo.id,
                })
              }
            >
              Save For Later
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  );
};

export const TodoCard = injectComponent<InjectedProps, OwnProps>(
  _TodoCard,
  appContainer,
  {
    activeTodoService: TODO_SERVICE_TYPES.ActiveTodoService,
    savedForLaterTodoService: TODO_SERVICE_TYPES.SavedForLaterTodoService,
  },
);
