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
import { GoalMSG } from 'src/commons/enums/goal_msg.enum';
import { IGoal } from 'src/commons/interfaces/goal.interface';
import { ClientProxyGoalTracker } from 'src/commons/proxy/client_proxy';
import { GoalDto } from '../dto/goal.dto';

@ApiTags('Goal')
@Controller('api/v1/goals')
export class GoalController {
  private readonly logger = new Logger(GoalController.name);
  constructor(private readonly clientProxy: ClientProxyGoalTracker) {}
  private clientGoalTrackerProxy = this.clientProxy.clientProxyGoalTracker();

  @Post()
  create(@Body() goal: GoalDto): Observable<IGoal> {
    return this.clientGoalTrackerProxy.send(GoalMSG.CREATE, goal);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: number): Observable<IGoal[]> {
    return this.clientGoalTrackerProxy.send(GoalMSG.FIND_ALL, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IGoal> {
    return this.clientGoalTrackerProxy.send(GoalMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() goal: GoalDto): Observable<IGoal> {
    return this.clientGoalTrackerProxy.send(GoalMSG.UPDATE, { id, goal });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.clientGoalTrackerProxy.send(GoalMSG.DELETE, id);
  }
}
