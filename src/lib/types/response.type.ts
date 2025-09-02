export interface Response<T> {
  status: number;
  message: string;
  payload: T;
  errors: Array<{
    error: string;
    msg: string;
  }> | null;
}