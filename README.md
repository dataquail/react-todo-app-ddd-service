# Description

Todo app written with with domain driven design service-esque layering.

## Examples

`ActiveTodoService` represents a hybrid service that encapsulates both backend (DTOs) and frontend state (prioritizing) for active todos. Prioritizing is an ephemeral feature for now until the backend team can implement it to fully persist.

`TodoReviewService` represents a frontend-only service that encapsulates frontend state for focusing/unfocusing on ActiveTodos and SavedForLaterTodos, as well as maintaining a `lastReviewedAt` timestamp for each kind of todo.

`SavedForLaterTodoService` represents a backend-only service that encapsulates backend state for CRUD operations on SavedForLaterTodos, and converting a SavedForLaterTodo into an ActiveTodo.

## Notes

Maybe the `TodoReviewService` shouldn't be this carousel flow where the user reviews each uncompleted Todo one-by-one. Maybe instead it should start a process that gathers all uncompleted reviews. It will only grab todos that are uncompleted and were created before the time the review process was started. The review can be Started, Abandoned,  or Finished. Todos under review will display the current state of the (active) todo under review, when it was last reviewed, and expose the options to complete, uncomplete, delete, or save for later. The review will also show when it was started. When it is abandoned, the review record will be deleted. When it is completed, it will update the lastReviewedAt date with the date of the review record, and delete the pending review record.

Shape of the store:

{
  reviewedTodosDict: {
    [todoId]: {
      todoId,
      lastReviewedAt,
      isActiveTodo,
    }
  },
  currentReview: {
    startedAt,
    todosUnderReview: [todoId1, todoId2, ...]
  }
}

Perhaps there should be 2 repositories, because there are 2 different concepts. `ReviewRepository` and `ReviewedTodosRepository`. The `todosUnderReview` simply reference the records in the `ReviewedTodosRepository`.

Or maybe there's just a TodoReviewRepository. A query use case makes a view model of the todo under review, wherein it stitches all the data together from the active and savedForLater todo services. But I don't know how domain events will factor in. I suppose i could make events for the delete actions so they will purge the todo id from the todoReview. The query use case will otherwise omit todos it cannot find in either the active or savedForLater lists as a precaution if server state become incongruent with client state.

### Tasks

- [X] Refactor current TodoService to hybrid-style `ActiveTodoService` including ability to prioritize ActiveTodos.
- [X] Implement `TodoReviewService` with ability to focus/unfocus, and maintain a `lastReviewedAt` timestamp via some `review` method.
- [X] Implement `SavedForLaterTodoService` with ability to save an ActiveTodo for later, and turn a SavedForLaterTodo back into an ActiveTodo.
- [ ] Implement Application Event Bus that deletes TodoUnderReview records from the TodoReviewService
- [ ] Command Use Case for starting the review process
- [ ] Command Use Case for review and proceed
- [ ] Command Use Case for Undo previous review and go back
- [ ] Query Use Case for getting list of todos to review (wrap with `Chimeric` type)
- [ ] Implement `ChimericPromise` that wraps mutative use cases
- [ ] Possibly do dependency injection for MakeChimericQuery, MakeChimericQueryWithManagedStore, MakeMutativeQuery so queryClient doesn't need to be passed
- [ ] Tests for MakeChimericQuery, MakeChimericQueryWithManagedStore, MakeMutativeQuery
- [ ] Refactor folder structure in domain
- [ ] Tests for services
