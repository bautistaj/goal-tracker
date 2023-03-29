import { GoalDomain } from 'src/goal/domain/goal.domain';

export interface CreateGoalCommand {
  execute(goalDate: GoalData): Promise<GoalDomain>;
}

export class GoalData {
  title: string;
  description: string;
  progress: string;
  category: string;
  userId: number;
}
