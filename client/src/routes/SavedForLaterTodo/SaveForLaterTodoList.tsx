import { Flex, Loader, ScrollArea } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { injectComponent } from 'src/utils/inversify/injectComponent';
import { appContainer } from 'src/core/global/appContainer';
import { InjectionSymbol, type InjectionType } from 'src/core/global/types';
import { SavedForLaterTodoCard } from './SavedForLaterTodoCard';

type InjectedProps = {
  savedForLaterTodoService: InjectionType<'SavedForLaterTodoService'>;
};

export const SaveForLaterTodoList = injectComponent<InjectedProps>(
  ({ savedForLaterTodoService }) => {
    const { data, isPending } = savedForLaterTodoService.getAll.useQuery();
    const { height } = useViewportSize();

    if (isPending || !data) {
      return (
        <Flex justify="center" align="center" w="100%" h="100%">
          <Loader />
        </Flex>
      );
    }

    return (
      <ScrollArea.Autosize mah={`calc(${height}px - 172px`}>
        {data.map((savedForLaterTodo) => (
          <SavedForLaterTodoCard
            key={savedForLaterTodo.id}
            savedForLaterTodo={savedForLaterTodo}
          />
        ))}
      </ScrollArea.Autosize>
    );
  },
  appContainer,
  {
    savedForLaterTodoService: InjectionSymbol('SavedForLaterTodoService'),
  },
);
