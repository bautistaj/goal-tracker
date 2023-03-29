import { GoalDomain } from 'src/goal/domain/goal.domain';

export interface FindAllGoalsByUserIdQuery {
  execute(userId: number): Promise<GoalDomain[]>;
}
