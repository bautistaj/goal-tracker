import { Inject } from '@nestjs/common';
import { TaskDomain } from 'src/task/domain/task.domain';
import {
  UpdateTaskCommand,
  UpdateTaskData,
} from '../port/in/update_task.command';
import { ITaskRepository } from '../port/out/itask.repository';

export class UpdateTaskUseCase implements UpdateTaskCommand {
  constructor(
    @Inject('ITaskRepository') private readonly taskAdapter: ITaskRepository,
  ) {}

  execute(goalId: number, data: UpdateTaskData): Promise<TaskDomain> {
    const taskDomain = new TaskDomain();
    taskDomain.description = data.task.description;
    taskDomain.state = data.task.state;
    taskDomain.title = data.task.title;
    taskDomain.goalId = data.task.goalId;
    return this.taskAdapter.update(goalId, taskDomain);
  }
}
