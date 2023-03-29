import { TaskDomain } from 'src/task/domain/task.domain';

export interface FindTaskOneByIdQuery {
  execute(goalId: number): Promise<TaskDomain>;
}
