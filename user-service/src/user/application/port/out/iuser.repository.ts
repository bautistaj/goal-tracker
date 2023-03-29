import { UserDomain } from 'src/user/domain/user.domain';

export interface IUserRepository {
  findAll(): Promise<UserDomain[]>;
  create(userDomain: UserDomain): Promise<UserDomain>;
}
