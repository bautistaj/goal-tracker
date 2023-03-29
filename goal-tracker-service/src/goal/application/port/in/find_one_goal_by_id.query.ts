import { GoalDomain } from 'src/goal/domain/goal.domain';

export interface FindOneGoalByIdQuery {
  execute(id: number): Promise<GoalDomain>;
}
