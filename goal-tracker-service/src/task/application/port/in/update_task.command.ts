import { TaskDomain } from 'src/task/domain/task.domain';

export interface UpdateTaskCommand {
  execute(goalId: number, taskData: UpdateTaskData): Promise<TaskDomain>;
}

export class UpdateTaskData {
  id: number;
  task: {
    title: string;
    description: string;
    state: string;
    goalId: number;
  };
}
