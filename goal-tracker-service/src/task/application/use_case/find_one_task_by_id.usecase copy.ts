import { Inject } from '@nestjs/common';
import { TaskDomain } from 'src/task/domain/task.domain';
import { FindTaskOneByIdQuery } from '../port/in/find_one_tasks_by_id.query';
import { ITaskRepository } from '../port/out/itask.repository';

export class FindOneTasksByIdUseCase implements FindTaskOneByIdQuery {
  constructor(
    @Inject('ITaskRepository') private readonly taskAdapter: ITaskRepository,
  ) {}
  execute(id: number): Promise<TaskDomain> {
    return this.taskAdapter.findOneById(id);
  }
}
