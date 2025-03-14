import {
  Box,
  Button,
  Group,
  Loader,
  ScrollArea,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { format } from 'date-fns';
import { injectComponent } from 'src/utils/inversify/injectComponent';
import { appContainer } from 'src/core/global/appContainer';
import { useViewportSize } from '@mantine/hooks';
import { InjectionSymbol, type InjectionType } from 'src/core/global/types';

type InjectedProps = {
  reviewRepository: InjectionType<'ReviewRepository'>;
  StartReview: InjectionType<'StartReview'>;
  FinishReview: InjectionType<'FinishReview'>;
  GetTodosUnderReview: InjectionType<'GetTodosUnderReview'>;
};

export const ReviewContent = injectComponent<InjectedProps>(
  ({ reviewRepository, StartReview, FinishReview, GetTodosUnderReview }) => {
    const review = reviewRepository.get.use();
    const hasStartedReview = Boolean(review);
    const startReview = StartReview.usePromise();
    const getTodosUnderReview = GetTodosUnderReview.useAsync();
    const { height } = useViewportSize();

    return (
      <Box>
        <Group justify="space-between" align="center" h="60px">
          <Title order={1}>Review Todos</Title>
          {hasStartedReview ? (
            <Button onClick={() => FinishReview.execute()}>
              Finish Review
            </Button>
          ) : (
            <Button onClick={() => startReview.call()}>Start Review</Button>
          )}
        </Group>
        <Space h="lg" />
        {startReview.isPending || getTodosUnderReview.isPending ? (
          <Loader />
        ) : (
          <ScrollArea.Autosize mah={`calc(${height}px - 172px`}>
            {getTodosUnderReview.data?.map((todo) => (
              <Box key={todo.id}>
                <Title order={4}>{todo.title}</Title>
                <Text size="sm">{`Created At: ${format(todo.createdAt, 'M/d/yyyy h:m aaa')}`}</Text>
              </Box>
            ))}
          </ScrollArea.Autosize>
        )}
      </Box>
    );
  },
  appContainer,
  {
    reviewRepository: InjectionSymbol('ReviewRepository'),
    StartReview: InjectionSymbol('StartReview'),
    FinishReview: InjectionSymbol('FinishReview'),
    GetTodosUnderReview: InjectionSymbol('GetTodosUnderReview'),
  },
);
