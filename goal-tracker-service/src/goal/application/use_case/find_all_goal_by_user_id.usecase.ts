import { Inject } from '@nestjs/common';
import { GoalDomain } from 'src/goal/domain/goal.domain';
import { FindAllGoalsByUserIdQuery } from '../port/in/find_all_goals_by_user_id.query';
import { IGoalRepository } from '../port/out/igoal.repository';

export class FindAllGoalByUserIdUseCase implements FindAllGoalsByUserIdQuery {
  constructor(
    @Inject('IGoalRepository') private readonly goalAdapter: IGoalRepository,
  ) {}
  execute(userId: number): Promise<GoalDomain[]> {
    return this.goalAdapter.findAll(userId);
  }
}
