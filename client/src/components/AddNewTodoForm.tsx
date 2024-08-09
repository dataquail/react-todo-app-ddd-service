import { Button, Group, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useTodoService } from 'src/modules/todo/infrastructure/services/TodoService/DI';

export const AddNewTodoForm = () => {
  const todoService = useTodoService();
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
        await todoService.create.mutateAsync({ title: values.title });
        form.setFieldValue('title', '');
      })}
    >
      <Group justify="space-between" align="start" h="100%" mt="md">
        <TextInput
          key={form.key('title')}
          placeholder="Enter your todo"
          {...form.getInputProps('title')}
        />
        <Button
          type="submit"
          loading={todoService.create.isPending}
          disabled={todoService.create.isPending}
        >
          Add
        </Button>
      </Group>
    </form>
  );
};
