export interface ITask {
  id: number;
  title: string;
  description: string;
  state: string;
  goalId: number;
  createdAt: Date;
  updatedAt: Date;
}
