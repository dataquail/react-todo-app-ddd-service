import { Title, Flex, Space } from '@mantine/core';
import { AppShellWrapper } from 'src/components/AppShellWrapper';

export const SavedForLaterTodo = () => {
  return (
    <AppShellWrapper>
      <>
        <Flex justify="flex-start" align="center" direction="row" h="60px">
          <Title order={1}>Saved For Later Todo List</Title>
        </Flex>
        <Space h="lg" />
      </>
    </AppShellWrapper>
  );
};
