import { Inject } from '@nestjs/common';
import { TaskDomain } from 'src/task/domain/task.domain';
import { FindAllTasksByGoalIdQuery } from '../port/in/find_all_tasks_by_goal_id.query';
import { ITaskRepository } from '../port/out/itask.repository';

export class FindAllTasksByGoalIdUseCase implements FindAllTasksByGoalIdQuery {
  constructor(
    @Inject('ITaskRepository') private readonly taskAdapter: ITaskRepository,
  ) {}
  execute(goalId: number): Promise<TaskDomain[]> {
    return this.taskAdapter.findAll(goalId);
  }
}
