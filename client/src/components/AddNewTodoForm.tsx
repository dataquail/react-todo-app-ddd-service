import { Button, Group, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { appContainer } from 'src/modules/global/appContainer';
import { IActiveTodoService } from 'src/modules/todo/domain/services/IActiveTodoService';
import { TODO_SERVICE_TYPES } from 'src/modules/todo/domain/services/types';
import { injectComponent } from 'src/utils/inversify/injectComponent';

type InjectedProps = {
  activeTodoService: IActiveTodoService;
};

export const AddNewTodoForm = injectComponent<InjectedProps>(
  ({ activeTodoService }) => {
    const { call, isPending } = activeTodoService.createOne.useMutation();
    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
        title: '',
      },
      validate: {
        title: hasLength({ min: 1 }, 'Must be at least 1 character long'),
      },
    });

    return (
      <form
        onSubmit={form.onSubmit(async (values) => {
          await call({ title: values.title });
          form.setFieldValue('title', '');
        })}
      >
        <Group justify="space-between" align="start" h="100%" mt="md">
          <TextInput
            key={form.key('title')}
            placeholder="Enter your todo"
            {...form.getInputProps('title')}
          />
          <Button type="submit" loading={isPending} disabled={isPending}>
            Add
          </Button>
        </Group>
      </form>
    );
  },
  appContainer,
  {
    activeTodoService: TODO_SERVICE_TYPES.ActiveTodoService,
  },
);
