import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './adapter/in/task.controller';
import { TaskPsqlModel } from './adapter/out/model/task_psql.model';
import { TaskAdapter } from './adapter/out/task.adapter';
import { CreateTaskUseCase } from './application/use_case/create_task.usecase';
import { DeleteTaskUseCase } from './application/use_case/delete_task.usecase';
import { FindAllTasksByGoalIdUseCase } from './application/use_case/find_all_tasks_by_goal_id.usecase';
import { FindOneTasksByIdUseCase } from './application/use_case/find_one_task_by_id.usecase copy';
import { UpdateTaskUseCase } from './application/use_case/update_task.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TaskPsqlModel])],
  providers: [
    {
      provide: 'FindAllTasksByGoalIdQuery',
      useClass: FindAllTasksByGoalIdUseCase,
    },
    {
      provide: 'ITaskRepository',
      useClass: TaskAdapter,
    },
    {
      provide: 'CreateTaskCommand',
      useClass: CreateTaskUseCase,
    },
    {
      provide: 'UpdateTaskCommand',
      useClass: UpdateTaskUseCase,
    },
    {
      provide: 'DeleteTaskCommand',
      useClass: DeleteTaskUseCase,
    },
    {
      provide: 'FindTaskOneByIdQuery',
      useClass: FindOneTasksByIdUseCase,
    },
  ],
  controllers: [TaskController],
})
export class TaskModule {}
