import { Global, Logger, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const logger = new Logger('Database configuration');
        const { type, database, port, username, password, host } =
          configService.postgres;
        logger.debug(`Database configuration database: ${database} ready`);
        logger.debug(`Database configuration host: ${host}`);
        logger.debug(`Database configuration port: ${port}`);
        logger.debug(`Database configuration user: ${username}`);
        return {
          type,
          host,
          port,
          username,
          password,
          database,
          synchronize: true,
          autoLoadEntities: true,
        } as DataSourceOptions;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
