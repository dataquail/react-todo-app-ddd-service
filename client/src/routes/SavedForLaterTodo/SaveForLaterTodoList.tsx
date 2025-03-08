import { Flex, Loader, ScrollArea } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { ISavedForLaterTodoService } from 'src/modules/todo/domain/services/ISavedForLaterTodoService';
import { injectComponent } from 'src/utils/inversify/injectComponent';
import { appContainer } from 'src/modules/global/appContainer';
import { TODO_SERVICE_TYPES } from 'src/modules/todo/domain/services/types';
import { SavedForLaterTodoCard } from './SavedForLaterTodoCard';

type InjectedProps = {
  savedForLaterTodoService: ISavedForLaterTodoService;
};

const _SaveForLaterTodoList = ({ savedForLaterTodoService }: InjectedProps) => {
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
};

export const SaveForLaterTodoList = injectComponent<InjectedProps>(
  _SaveForLaterTodoList,
  appContainer,
  { savedForLaterTodoService: TODO_SERVICE_TYPES.SavedForLaterTodoService },
);
