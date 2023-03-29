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
import { UserMSG } from 'src/commons/enums/user_msg.enum';
import { IUser } from 'src/commons/interfaces/user.interface';
import { ClientProxyGoalTracker } from 'src/commons/proxy/client_proxy';
import { UserDto } from '../dto/user.dto';

@ApiTags('Users')
@Controller('api/v1/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly clientProxy: ClientProxyGoalTracker) {}
  private clientUserProxy = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() user: UserDto): Observable<IUser> {
    this.logger.debug(`User: ${user.email}`);
    return this.clientUserProxy.send(UserMSG.CREATE, user);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this.clientUserProxy.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this.clientUserProxy.send(UserMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UserDto): Observable<IUser> {
    return this.clientUserProxy.send(UserMSG.UPDATE, { id, user });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this.clientUserProxy.send(UserMSG.DELETE, id);
  }
}
