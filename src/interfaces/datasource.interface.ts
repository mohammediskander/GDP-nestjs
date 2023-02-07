export interface DataSource<T> {
  find(): T[];

  findOneOrFail(id: string): T;

  create(payload: Partial<T>): T;

  update(id: string, payload: Partial<T>): T;

  delete(id: string): { message: string };
}
