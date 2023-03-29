import { TaskDomain } from 'src/task/domain/task.domain';

export interface ITaskRepository {
  findAll(goalId: number): Promise<TaskDomain[]>;
  create(taskDomain: TaskDomain): Promise<TaskDomain>;
  update(id: number, taskDomain: TaskDomain): Promise<TaskDomain>;
  delete(id: number): Promise<any>;
  findOneById(id: number): Promise<TaskDomain>;
}
