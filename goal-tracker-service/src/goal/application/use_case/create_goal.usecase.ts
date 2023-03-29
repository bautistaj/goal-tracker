import { Inject } from '@nestjs/common';
import { GoalDomain } from 'src/goal/domain/goal.domain';
import { CreateGoalCommand, GoalData } from '../port/in/create_goal.command';
import { IGoalRepository } from '../port/out/igoal.repository';

export class CreateGoalUseCase implements CreateGoalCommand {
  constructor(
    @Inject('IGoalRepository')
    private readonly goalAdapter: IGoalRepository,
  ) {}

  execute(data: GoalData): Promise<GoalDomain> {
    const goalDomain = new GoalDomain();
    goalDomain.category = data?.category;
    goalDomain.description = data.description;
    goalDomain.title = data.title;
    goalDomain.userId = data.userId;

    return this.goalAdapter.create(goalDomain);
  }
}
