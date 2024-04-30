export class ResponseClass<T> {
  public msg: string;
  public status: number;
  public data: T;
  constructor(msg: string, status: number, data: T = [] as unknown as T) {
    this.msg = msg;
    this.status = status;
    this.data = data;
  }
}
