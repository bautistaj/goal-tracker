import { TaskDomain } from 'src/task/domain/task.domain';

export interface FindAllTasksByGoalIdQuery {
  execute(goalId: number): Promise<TaskDomain[]>;
}
