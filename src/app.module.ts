import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GraphModule } from './graph/graph.module';
import { SampleModule } from './sample/sample.module';
import { CommonModule } from './common/common.module';
import { ConfigModule as AppConfigModule } from './config/config.module';
import { envConfig } from './config/env/configuration.config';
import { IEnvConfig } from './config/interfaces/env.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => envConfig],
    }),
    GraphModule, 
    SampleModule, 
    CommonModule,
    AppConfigModule,
  ],
  controllers: [],
  providers: [
    {
      provide: ConfigService,
      useFactory: (configService: ConfigService) =>
        configService as unknown as ConfigService<IEnvConfig>,
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
