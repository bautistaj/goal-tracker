import { Inject } from '@nestjs/common';
import { GoalDomain } from 'src/goal/domain/goal.domain';
import { FindOneGoalByIdQuery } from '../port/in/find_one_goal_by_id.query';
import { IGoalRepository } from '../port/out/igoal.repository';

export class FindOneGoalByIdUseCase implements FindOneGoalByIdQuery {
  constructor(
    @Inject('IGoalRepository') private readonly goalAdapter: IGoalRepository,
  ) {}
  execute(id: number): Promise<GoalDomain> {
    return this.goalAdapter.findOneById(id);
  }
}
