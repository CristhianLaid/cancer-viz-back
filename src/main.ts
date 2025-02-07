import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config/env/configuration.config';
import { Logger } from '@nestjs/common';
import { CorsConfigService } from './config/cors/cors.config.service';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  // Obtiene la configuración de CORS desde el servicio
  const corsConfigService = app.get(CorsConfigService);
  const corsOptions = corsConfigService.getCorsConfigOption();
  app.enableCors(corsOptions);
  
  await app.listen(envConfig.PORT ?? 3005);
  logger.log(`Listening in http://localhost:${envConfig.PORT}`);
}
bootstrap();
