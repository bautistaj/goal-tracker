import { Module } from '@nestjs/common';
import { ClientProxyGoalTracker } from './client_proxy';

@Module({
  providers: [ClientProxyGoalTracker],
  exports: [ClientProxyGoalTracker],
})
export class ProxyModule {}
