import { Controller, Logger, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/commons/enums/user_msg.enum';
import {
  CreateUserCommand,
  UserData,
} from 'src/user/application/port/in/create_user.command';
import { FindAllUsersQuery } from 'src/user/application/port/in/find_all_users.query';
import { UserDomain } from 'src/user/domain/user.domain';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    @Inject('FindAllUsersQuery')
    private readonly findAllUsersQuery: FindAllUsersQuery,
    @Inject('CreateUserCommand')
    private readonly createUserCommand: CreateUserCommand,
  ) {}

  @MessagePattern(UserMSG.FIND_ALL)
  findAll(): Promise<UserDomain[]> {
    return this.findAllUsersQuery.execute();
  }

  @MessagePattern(UserMSG.CREATE)
  create(@Payload() user: UserData): Promise<UserDomain> {
    return this.createUserCommand.execute(user);
  }
}
