import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './adapter/in/user.controller';
import { UserPsqlModel } from './adapter/out/model/user_psql.model';
import { UserAdapter } from './adapter/out/user.adapter';
import { CreateUserUseCase } from './application/use_case/create_user.usecase';
import { FindAllUserUseCase } from './application/use_case/find_all_users.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserPsqlModel])],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserAdapter,
    },
    {
      provide: 'FindAllUsersQuery',
      useClass: FindAllUserUseCase,
    },
    {
      provide: 'CreateUserCommand',
      useClass: CreateUserUseCase,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
