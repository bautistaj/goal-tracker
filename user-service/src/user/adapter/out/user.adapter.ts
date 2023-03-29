import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/user/application/port/out/iuser.repository';
import { UserDomain } from 'src/user/domain/user.domain';
import { Repository } from 'typeorm';
import { UserPsqlModel } from './model/user_psql.model';

@Injectable()
export class UserAdapter implements IUserRepository {
  constructor(
    @InjectRepository(UserPsqlModel)
    private userPsqlRepository: Repository<UserPsqlModel>,
  ) {}

  async findAll(): Promise<UserDomain[]> {
    const listUser = await this.userPsqlRepository.find();
    return UserPsqlModel.toLstDomain(listUser);
  }

  async create(userDomain: UserDomain): Promise<UserDomain> {
    return this.userPsqlRepository.save(UserPsqlModel.fromDomain(userDomain));
  }
}
