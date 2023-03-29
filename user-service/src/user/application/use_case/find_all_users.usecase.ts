import { Inject, Injectable } from '@nestjs/common';
import { UserDomain } from 'src/user/domain/user.domain';
import { FindAllUsersQuery } from '../port/in/find_all_users.query';
import { IUserRepository } from '../port/out/iuser.repository';

@Injectable()
export class FindAllUserUseCase implements FindAllUsersQuery {
  constructor(
    @Inject('IUserRepository')
    private readonly userAdapter: IUserRepository,
  ) {}

  execute(): Promise<UserDomain[]> {
    return this.userAdapter.findAll();
  }
}
