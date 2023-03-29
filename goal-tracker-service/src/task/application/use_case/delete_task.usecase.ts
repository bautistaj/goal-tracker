import { Inject } from '@nestjs/common';
import { DeleteTaskCommand } from '../port/in/delete_task.command';
import { ITaskRepository } from '../port/out/itask.repository';

export class DeleteTaskUseCase implements DeleteTaskCommand {
  constructor(
    @Inject('ITaskRepository') private readonly taskAdapter: ITaskRepository,
  ) {}
  execute(id: number): any {
    return this.taskAdapter.delete(id);
  }
}
