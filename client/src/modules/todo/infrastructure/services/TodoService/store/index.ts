import { ITodoStore, TodoRecord } from './types';

class TodoStore implements ITodoStore {
  private todoDictionary: { [id: string]: TodoRecord | undefined };

  constructor() {
    this.todoDictionary = {};
  }

  findOneById(id: string) {
    return this.todoDictionary[id];
  }

  save(todo: TodoRecord) {
    this.todoDictionary[todo.id] = todo;
  }

  delete(id: string) {
    delete this.todoDictionary[id];
  }

  deleteAll() {
    this.todoDictionary = {};
  }
}

export const todoStore = new TodoStore();
