import { Inject } from '@nestjs/common';
import { TaskDomain } from 'src/task/domain/task.domain';
import { CreateTaskCommand, TaskData } from '../port/in/create_task.command';
import { ITaskRepository } from '../port/out/itask.repository';

export class CreateTaskUseCase implements CreateTaskCommand {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskAdapter: ITaskRepository,
  ) {}

  execute(data: TaskData): Promise<TaskDomain> {
    const taskDomain = new TaskDomain();
    taskDomain.description = data.description;
    taskDomain.state = data.state;
    taskDomain.title = data.title;
    taskDomain.goalId = data.goalId;
    return this.taskAdapter.create(taskDomain);
  }
}
