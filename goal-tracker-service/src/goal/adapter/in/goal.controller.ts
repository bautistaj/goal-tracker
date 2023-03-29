import { Controller, Logger, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GoalMSG } from 'src/commons/enums/goal_msg.enum';
import {
  CreateGoalCommand,
  GoalData,
} from 'src/goal/application/port/in/create_goal.command';
import { DeleteGoalCommand } from 'src/goal/application/port/in/delete_goal.command';
import { FindAllGoalsByUserIdQuery } from 'src/goal/application/port/in/find_all_goals_by_user_id.query';
import { FindOneGoalByIdQuery } from 'src/goal/application/port/in/find_one_goal_by_id.query';
import {
  UpdateGoalCommand,
  UpdateGoalData,
} from 'src/goal/application/port/in/update_goal.command';
import { GoalDomain } from 'src/goal/domain/goal.domain';

@Controller()
export class GoalController {
  private readonly logger = new Logger(GoalController.name);

  constructor(
    @Inject('FindAllGoalsByUserIdQuery')
    private readonly findAllGoalsByUserIdQuery: FindAllGoalsByUserIdQuery,
    @Inject('CreateGoalCommand')
    private readonly createGoalCommand: CreateGoalCommand,
    @Inject('UpdateGoalCommand')
    private readonly updateGoalCommand: UpdateGoalCommand,
    @Inject('DeleteGoalCommand')
    private readonly deleteGoalCommand: DeleteGoalCommand,
    @Inject('FindOneGoalByIdQuery')
    private readonly findOneGoalByIdQuery: FindOneGoalByIdQuery,
  ) {}

  @MessagePattern(GoalMSG.FIND_ALL)
  findAll(@Payload('userId') userId: number): Promise<GoalDomain[]> {
    return this.findAllGoalsByUserIdQuery.execute(userId);
  }

  @MessagePattern(GoalMSG.FIND_ONE)
  findOne(@Payload('id') id: number): Promise<GoalDomain> {
    return this.findOneGoalByIdQuery.execute(id);
  }

  @MessagePattern(GoalMSG.CREATE)
  create(@Payload() goal: GoalData): Promise<GoalDomain> {
    return this.createGoalCommand.execute(goal);
  }

  @MessagePattern(GoalMSG.UPDATE)
  update(@Payload() data: UpdateGoalData): Promise<GoalDomain> {
    return this.updateGoalCommand.execute(data.id, data);
  }

  @MessagePattern(GoalMSG.DELETE)
  delete(@Payload() id: number): any {
    return this.deleteGoalCommand.execute(id);
  }
}
