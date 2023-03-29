import { Inject } from '@nestjs/common';
import { DeleteGoalCommand } from '../port/in/delete_goal.command';
import { IGoalRepository } from '../port/out/igoal.repository';

export class DeleteGoalUseCase implements DeleteGoalCommand {
  constructor(
    @Inject('IGoalRepository') private readonly goalAdapter: IGoalRepository,
  ) {}
  execute(id: number): any {
    return this.goalAdapter.delete(id);
  }
}
