import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalController } from './adapter/in/goal.controller';
import { GoalAdapter } from './adapter/out/goal.adapter';
import { GoalPsqlModel } from './adapter/out/model/goal_psql.model';
import { CreateGoalUseCase } from './application/use_case/create_goal.usecase';
import { DeleteGoalUseCase } from './application/use_case/delete_goal.usecase';
import { FindAllGoalByUserIdUseCase } from './application/use_case/find_all_goal_by_user_id.usecase';
import { FindOneGoalByIdUseCase } from './application/use_case/find_one_goal_by_id.usecase';
import { UpdateGoalUseCase } from './application/use_case/update_goal.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([GoalPsqlModel])],
  providers: [
    {
      provide: 'FindAllGoalsByUserIdQuery',
      useClass: FindAllGoalByUserIdUseCase,
    },
    {
      provide: 'IGoalRepository',
      useClass: GoalAdapter,
    },
    {
      provide: 'CreateGoalCommand',
      useClass: CreateGoalUseCase,
    },
    {
      provide: 'UpdateGoalCommand',
      useClass: UpdateGoalUseCase,
    },
    {
      provide: 'DeleteGoalCommand',
      useClass: DeleteGoalUseCase,
    },
    {
      provide: 'FindOneGoalByIdQuery',
      useClass: FindOneGoalByIdUseCase,
    },
  ],
  controllers: [GoalController],
})
export class GoalModule {}
