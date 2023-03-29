import { UserDomain } from 'src/user/domain/user.domain';

export interface FindAllUsersQuery {
  execute(): Promise<UserDomain[]>;
}
