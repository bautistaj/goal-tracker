import { Inject } from '@nestjs/common';
import { UserDomain } from 'src/user/domain/user.domain';
import { CreateUserCommand, UserData } from '../port/in/create_user.command';
import { IUserRepository } from '../port/out/iuser.repository';

export class CreateUserUseCase implements CreateUserCommand {
  constructor(
    @Inject('IUserRepository')
    private readonly userAdapter: IUserRepository,
  ) {}

  execute(data: UserData): Promise<UserDomain> {
    const userDomain = new UserDomain();
    userDomain.email = data.email;
    userDomain.password = data.password;
    userDomain.status = data.status;
    userDomain.username = data.username;
    userDomain.name = data.name;

    return this.userAdapter.create(userDomain);
  }
}
