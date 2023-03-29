import { GoalDomain } from 'src/goal/domain/goal.domain';

export interface UpdateGoalCommand {
  execute(userId: number, goalDate: UpdateGoalData): Promise<GoalDomain>;
}

export class UpdateGoalData {
  id: number;
  goal: {
    title: string;
    description: string;
    progress: string;
    category: string;
    userId: number;
  };
}
