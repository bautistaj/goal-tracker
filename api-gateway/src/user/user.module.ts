import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/commons/proxy/proxy.module';
import { UserController } from './controller/user.controller';

@Module({
  imports: [ProxyModule],
  controllers: [UserController],
})
export class UserModule {}
