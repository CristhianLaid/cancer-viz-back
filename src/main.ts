import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config/env/configuration.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  await app.listen(envConfig.PORT ?? 3005);
  logger.log(`Listening in http://localhost:${envConfig.PORT}`);
}
bootstrap();
