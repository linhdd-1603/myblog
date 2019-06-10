export interface ITask {
  id?: number;
  title?: string;
  description?: string;
}

export const defaultValue: Readonly<ITask> = {};
