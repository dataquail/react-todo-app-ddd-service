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
import { IconDots, IconPlus, IconTrash } from '@tabler/icons-react';
import { injectComponent } from 'src/utils/inversify/injectComponent';
import { appContainer } from 'src/core/global/appContainer';
import { InjectionSymbol, type InjectionType } from 'src/core/global/types';
import { SavedForLaterTodo } from 'src/core/domain/savedForLaterTodo/entities/SavedForLaterTodo';

type InjectedProps = {
  savedForLaterTodoService: InjectionType<'SavedForLaterTodoService'>;
};

type OwnProps = {
  savedForLaterTodo: SavedForLaterTodo;
};

export const SavedForLaterTodoCard = injectComponent<InjectedProps, OwnProps>(
  ({ savedForLaterTodo, savedForLaterTodoService }) => {
    const activateOne = savedForLaterTodoService.activate.useMutation();
    const deleteOne = savedForLaterTodoService.deleteOne.useMutation();

    return (
      <Box key={savedForLaterTodo.id} p="xs" pr="lg">
        <Group wrap="nowrap" align="flex-start">
          <Checkbox.Card radius="md" checked={false} disabled={true}>
            <Group wrap="nowrap" align="flex-start">
              {deleteOne.isPending || activateOne.isPending ? (
                <Loader p="xs" />
              ) : (
                <Checkbox.Indicator mt="sm" ml="sm" />
              )}
              <Stack p="xs" align="stretch" gap="xs">
                <Title order={4}>{savedForLaterTodo.title}</Title>
                <Text size="sm">{`Created At: ${format(savedForLaterTodo.createdAt, 'M/d/yyyy h:m aaa')}`}</Text>
              </Stack>
            </Group>
          </Checkbox.Card>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <IconDots />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Saved For Later Todo Options</Menu.Label>
              <Menu.Item
                color="red"
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => deleteOne.call({ id: savedForLaterTodo.id })}
              >
                Delete
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconPlus style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() =>
                  activateOne.call({
                    savedForLaterTodoId: savedForLaterTodo.id,
                  })
                }
              >
                Activate
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Box>
    );
  },
  appContainer,
  {
    savedForLaterTodoService: InjectionSymbol('SavedForLaterTodoService'),
  },
);
