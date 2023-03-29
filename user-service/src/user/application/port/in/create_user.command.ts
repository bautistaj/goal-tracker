import { UserDomain } from 'src/user/domain/user.domain';

export interface CreateUserCommand {
  execute(userData: UserData): Promise<UserDomain>;
}

export class UserData {
  email: string;
  password: string;
  status: string;
  username: string;
  name: string;
}
