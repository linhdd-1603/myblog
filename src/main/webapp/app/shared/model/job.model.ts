export interface IJob {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
}

export const defaultValue: Readonly<IJob> = {};
