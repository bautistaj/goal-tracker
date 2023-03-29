import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/commons/proxy/proxy.module';
import { TaskController } from './controller/task.controller';

@Module({
  imports: [ProxyModule],
  controllers: [TaskController],
})
export class TaskModule {}
