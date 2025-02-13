import { Module } from '@nestjs/common';
import { CancervizController } from './controllers';
import { CancervizSeedService, CancervizService } from './services';
import { CommonModule } from 'src/common/common.module';
import { CancervizSeedController } from './controllers/cancerviz.seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancerType, Cancerviz, ConstructionProtocol, Country, DataSource, SampleType } from './entities';
import { AuthModule } from '../auth/auth.module';
import { CancerVizCrudSampleController } from './controllers/cancerviz.crud.sample.controller';
import { CancerVizCrudSampleService } from './services/cancerviz.crud.sample.service';

@Module({
  controllers: [CancervizController, CancervizSeedController, CancerVizCrudSampleController],
  providers: [CancervizService, CancervizSeedService, CancerVizCrudSampleService],
  imports: [
    CommonModule,
    AuthModule,
    TypeOrmModule.forFeature([
      Cancerviz,
      CancerType,
      DataSource,
      SampleType,
      ConstructionProtocol,
      Country
    ])
  ],
  exports: [TypeOrmModule]
})
export class CancervizModule {}
