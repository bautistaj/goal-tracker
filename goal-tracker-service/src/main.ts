import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RabbitMQEnum } from './commons/enums/rabbit_mq.enum';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: RabbitMQEnum.GOAL_TRACKER_QUEUE,
    },
  });
  await app.listen();
  logger.debug(`The goal-tracker's microservice is listening`);
}
bootstrap();
