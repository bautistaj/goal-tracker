import { TaskDomain } from 'src/task/domain/task.domain';

export interface CreateTaskCommand {
  execute(userData: TaskData): Promise<TaskDomain>;
}

export class TaskData {
  title: string;
  description: string;
  state: string;
  goalId: number;
}
