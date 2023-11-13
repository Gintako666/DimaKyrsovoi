export interface IStatus {
  name: string,
  id: number
}

export interface ITask {
  id: number;
  name: string;
  status: IStatus;
}
