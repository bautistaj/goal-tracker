import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/commons/proxy/proxy.module';
import { GoalController } from './controller/goal.controller';

@Module({
  imports: [ProxyModule],
  controllers: [GoalController],
})
export class GoalModule {}
