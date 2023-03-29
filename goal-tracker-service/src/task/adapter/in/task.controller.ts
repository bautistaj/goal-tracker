import { Controller, Logger, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskMSG } from 'src/commons/enums/task_msg.enum';
import {
  CreateTaskCommand,
  TaskData,
} from 'src/task/application/port/in/create_task.command';
import { DeleteTaskCommand } from 'src/task/application/port/in/delete_task.command';
import { FindAllTasksByGoalIdQuery } from 'src/task/application/port/in/find_all_tasks_by_goal_id.query';
import { FindTaskOneByIdQuery } from 'src/task/application/port/in/find_one_tasks_by_id.query';
import {
  UpdateTaskCommand,
  UpdateTaskData,
} from 'src/task/application/port/in/update_task.command';
import { TaskDomain } from 'src/task/domain/task.domain';

@Controller()
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(
    @Inject('FindAllTasksByGoalIdQuery')
    private readonly findAllTasksByGoalIdQuery: FindAllTasksByGoalIdQuery,
    @Inject('CreateTaskCommand')
    private readonly createTaskCommand: CreateTaskCommand,
    @Inject('UpdateTaskCommand')
    private readonly updateTaskCommand: UpdateTaskCommand,
    @Inject('DeleteTaskCommand')
    private readonly deleteTaskCommand: DeleteTaskCommand,
    @Inject('FindTaskOneByIdQuery')
    private readonly findTaskOneByIdQuery: FindTaskOneByIdQuery,
  ) {}

  @MessagePattern(TaskMSG.FIND_ALL)
  findAll(@Payload('goalId') goalId: number): Promise<TaskDomain[]> {
    return this.findAllTasksByGoalIdQuery.execute(goalId);
  }

  @MessagePattern(TaskMSG.FIND_ONE)
  findOne(@Payload() id: number): Promise<TaskDomain> {
    return this.findTaskOneByIdQuery.execute(id);
  }

  @MessagePattern(TaskMSG.CREATE)
  create(@Payload() goal: TaskData): Promise<TaskDomain> {
    return this.createTaskCommand.execute(goal);
  }

  @MessagePattern(TaskMSG.UPDATE)
  update(@Payload() data: UpdateTaskData): Promise<TaskDomain> {
    return this.updateTaskCommand.execute(data.id, data);
  }

  @MessagePattern(TaskMSG.DELETE)
  delete(@Payload() id: number): any {
    return this.deleteTaskCommand.execute(id);
  }
}
