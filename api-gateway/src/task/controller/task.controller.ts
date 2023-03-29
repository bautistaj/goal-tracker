import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { TaskMSG } from 'src/commons/enums/task_msg.enum';
import { ITask } from 'src/commons/interfaces/task.interface';
import { ClientProxyGoalTracker } from 'src/commons/proxy/client_proxy';
import { TaskDto } from '../dto/task.dto';

@ApiTags('Tasks')
@Controller('api/v1/tasks')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);
  constructor(private readonly clientProxy: ClientProxyGoalTracker) {}
  private clientGoalTrackerProxy = this.clientProxy.clientProxyGoalTracker();

  @Post()
  create(@Body() task: TaskDto): Observable<ITask> {
    return this.clientGoalTrackerProxy.send(TaskMSG.CREATE, task);
  }

  @Get('/goal/:goalId')
  findAll(@Param('goalId') goalId: number): Observable<ITask[]> {
    return this.clientGoalTrackerProxy.send(TaskMSG.FIND_ALL, goalId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<ITask> {
    return this.clientGoalTrackerProxy.send(TaskMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() goal: TaskDto): Observable<ITask> {
    return this.clientGoalTrackerProxy.send(TaskMSG.UPDATE, { id, goal });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.clientGoalTrackerProxy.send(TaskMSG.DELETE, id);
  }
}
