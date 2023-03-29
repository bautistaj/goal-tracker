import { Inject } from '@nestjs/common';
import { GoalDomain } from 'src/goal/domain/goal.domain';
import {
  UpdateGoalData,
  UpdateGoalCommand,
} from '../port/in/update_goal.command';
import { IGoalRepository } from '../port/out/igoal.repository';

export class UpdateGoalUseCase implements UpdateGoalCommand {
  constructor(
    @Inject('IGoalRepository') private readonly goalAdapter: IGoalRepository,
  ) {}

  execute(goalId: number, data: UpdateGoalData): Promise<GoalDomain> {
    const goalDomain = new GoalDomain();
    goalDomain.category = data.goal?.category;
    goalDomain.description = data.goal?.description;
    goalDomain.progress = data.goal?.progress;
    goalDomain.title = data.goal?.title;
    goalDomain.userId = data.goal?.userId;

    return this.goalAdapter.update(goalId, goalDomain);
  }
}
