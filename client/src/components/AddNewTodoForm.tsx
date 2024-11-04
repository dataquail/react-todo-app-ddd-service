import { Button, Group, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { activeTodoService } from 'src/modules/todo/infrastructure/services/ActiveTodoService';

export const AddNewTodoForm = () => {
  const { mutateAsync, isPending } = activeTodoService.createOne.useMutation();
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
        await mutateAsync({ title: values.title });
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
};
