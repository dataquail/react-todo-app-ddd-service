# Description

Todo app written with with domain driven design service-esque layering.

## Examples

`ActiveTodoService` represents a hybrid service that encapsulates both backend (DTOs) and frontend state (prioritizing) for active todos. Prioritizing is an ephemeral feature for now until the backend team can implement it to fully persist.

`TodoViewService` represents a frontend-only service that encapsulates frontend state for focusing/unfocusing on ActiveTodos and SavedForLaterTodos, as well as maintaining a `lastReviewedAt` timestamp for each kind of todo.

`SavedForLaterTodoService` represents a backend-only service that encapsulates backend state for CRUD operations on SavedForLaterTodos, and converting a SavedForLaterTodo into an ActiveTodo.

### Tasks

- [ ] Refactor current TodoService to hybrid-style `ActiveTodoService` including ability to prioritize ActiveTodos.
- [ ] Implement `TodoViewService` with ability to focus/unfocus, and maintain a `lastReviewedAt` timestamp via some `review` method.
- [ ] Implement `SavedForLaterTodoService` with ability to save an ActiveTodo for later, and turn a SavedForLaterTodo back into an ActiveTodo.
- [ ] Implement Domain Event Bus

