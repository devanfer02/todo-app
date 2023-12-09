export interface Todo {
  id: string;
  task: string;
  description: string;
}

export enum Status {
  SUCCESS,
  FAIL
}

export interface Flash {
  status: Status;
  message: string;
}