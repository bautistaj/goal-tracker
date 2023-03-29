import { GoalDomain } from 'src/goal/domain/goal.domain';

export interface IGoalRepository {
  findAll(userId: number): Promise<GoalDomain[]>;
  create(goalDomain: GoalDomain): Promise<GoalDomain>;
  update(id: number, goalDomain: GoalDomain): Promise<GoalDomain>;
  delete(id: number): Promise<any>;
  findOneById(id: number): Promise<GoalDomain>;
}
