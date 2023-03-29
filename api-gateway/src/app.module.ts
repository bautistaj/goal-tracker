import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { GoalModule } from './goal/goal.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
      isGlobal: true,
    }),
    UserModule,
    GoalModule,
    TaskModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
