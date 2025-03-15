# Description

Todo app written with with domain driven design service-esque layering.

## Examples

`ActiveTodoService` represents a hybrid service that encapsulates both backend (DTOs) and frontend state (prioritizing) for active todos. Prioritizing is an ephemeral feature for now until the backend team can implement it to fully persist.

`SavedForLaterTodoService` represents a backend-only service that encapsulates backend state for CRUD operations on SavedForLaterTodos, and converting a SavedForLaterTodo into an ActiveTodo.

`ReviewRepository` represents a frontend-only interface that encapsulates the `Review` domain model.

`ReviewedTodoRepository` represents a frontend-only interface that encapsulates the `ReviewedTodo` domain model.

### Tasks

- [X] Refactor current TodoService to hybrid-style `ActiveTodoService` including ability to prioritize ActiveTodos.
- [X] Implement `TodoReviewService` with ability to focus/unfocus, and maintain a `lastReviewedAt` timestamp via some `review` method.
- [X] Implement `SavedForLaterTodoService` with ability to save an ActiveTodo for later, and turn a SavedForLaterTodo back into an ActiveTodo.
- [X] Implement Application Event Bus that deletes TodoUnderReview records from the TodoReviewService
- [X] Command Use Case for starting the review process
- [X] Command Use Case for review and proceed
- [X] Query Use Case for getting list of todos to review (wrap with `Chimeric` type)
- [X] Implement `ChimericPromise` that wraps mutative use cases
- [ ] Possibly do dependency injection for MakeChimericQuery, MakeChimericQueryWithManagedStore, MakeMutativeQuery so queryClient doesn't need to be passed
- [ ] Tests for MakeChimericQuery, MakeChimericQueryWithManagedStore, MakeMutativeQuery
- [X] Refactor folder structure in domain
- [ ] Tests for services
