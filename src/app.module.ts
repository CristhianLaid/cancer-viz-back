import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GraphModule } from './modules/graph/graph.module';
import { SampleModule } from './modules/sample/sample.module';
import { CommonModule } from './common/common.module';
import { ConfigModule as AppConfigModule } from './config/config.module';
import { envConfig } from './config/env/configuration.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IEnvConfig } from './config/env/interfaces/env.interface';
import { CoreModule } from './core/core.module';
import { CancervizModule } from './modules/cancerviz/cancerviz.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => envConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IEnvConfig>) => ({
        type: 'postgres',
        url: configService.get("DATABASE_URL"),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') !== 'production'
      })
    }),
    GraphModule, 
    SampleModule, 
    CommonModule,
    AppConfigModule,
    CoreModule,
    CancervizModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
