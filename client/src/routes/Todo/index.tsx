import { Container, Group, Title } from '@mantine/core';
import { TodoList } from 'src/components/TodoList';
import { AddNewTodoForm } from 'src/components/AddNewTodoForm';
import { useTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';
import { useMarkTodoAsCompleted } from 'src/modules/todo/domain/application/MarkTodoAsCompleted/DI';
import { useMarkCompletedTodoAsNotComplete } from 'src/modules/todo/domain/application/MarkCompletedTodoAsNotCompleted/DI';
import { PageContainer } from 'src/components/PageContainer';
import { PageContent } from 'src/components/PageContent';
import { todoServiceReactive } from 'src/modules/todo/infrastructure/services/TodoService/DIReactive';

export const Todo = () => {
  const todoRepository = useTodoRepository();
  const { isPending, data } = todoServiceReactive.useGetAll();
  const markTodoAsCompleted = useMarkTodoAsCompleted();
  const markCompletedTodoAsNotComplete = useMarkCompletedTodoAsNotComplete();

  return (
    <PageContainer>
      <PageContent>
        <Container>
          <Group justify="space-between" align="start">
            <Title order={1}>Todo List</Title>
            <AddNewTodoForm />
          </Group>
          <TodoList
            isPending={isPending}
            todoList={data}
            markTodoAsCompleted={markTodoAsCompleted}
            markCompletedTodoAsNotComplete={markCompletedTodoAsNotComplete}
            todoRepository={todoRepository}
          />
        </Container>
      </PageContent>
    </PageContainer>
  );
};
