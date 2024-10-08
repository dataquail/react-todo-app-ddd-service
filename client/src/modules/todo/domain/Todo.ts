import { v4 } from 'uuid';

export class Todo {
  readonly id: string;
  readonly title: string;
  readonly createdAt: Date;
  readonly completedAt: Date | undefined;
  readonly isFavorited: boolean = false;

  constructor(
    id: string,
    title: string,
    createdAt: Date,
    completedAt: Date | undefined,
    isFavorited: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.isFavorited = isFavorited;
  }

  public static create(title: string): Todo {
    return new Todo(v4(), title, new Date(), undefined, false);
  }

  public complete() {
    if (this.completedAt) {
      throw new Error('Todo already completed');
    }

    return new Todo(
      this.id,
      this.title,
      this.createdAt,
      new Date(),
      this.isFavorited,
    );
  }

  public incomplete() {
    if (!this.completedAt) {
      throw new Error('Todo is not completed');
    }

    return new Todo(
      this.id,
      this.title,
      this.createdAt,
      undefined,
      this.isFavorited,
    );
  }
}
