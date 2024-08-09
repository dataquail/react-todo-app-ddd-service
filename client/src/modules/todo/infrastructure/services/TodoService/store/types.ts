export type TodoRecord = {
  id: string;
  isFavorited: boolean;
};

export type ITodoStore = {
  findOneById: (id: string) => TodoRecord | undefined;
  save: (todo: TodoRecord) => void;
  delete: (id: string) => void;
  deleteAll: () => void;
};
