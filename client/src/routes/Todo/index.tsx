import { Container, Group, Title } from '@mantine/core';
import { TodoList } from 'src/components/TodoList';
import { AddNewTodoForm } from 'src/components/AddNewTodoForm';
import { PageContainer } from 'src/components/PageContainer';
import { PageContent } from 'src/components/PageContent';

export const Todo = () => {
  return (
    <PageContainer>
      <PageContent>
        <Container>
          <Group justify="space-between" align="start">
            <Title order={1}>Todo List</Title>
            <AddNewTodoForm />
          </Group>
          <TodoList />
        </Container>
      </PageContent>
    </PageContainer>
  );
};
