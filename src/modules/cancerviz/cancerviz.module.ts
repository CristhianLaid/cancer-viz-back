import { Module } from '@nestjs/common';
import { CancervizController } from './controllers';
import { CancervizSeedService, CancervizService } from './services';
import { CommonModule } from 'src/common/common.module';
import { CancervizSeedController } from './controllers/cancerviz.seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancerType, Cancerviz, ConstructionProtocol, Country, DataSource, SampleType } from './entities';

@Module({
  controllers: [CancervizController, CancervizSeedController],
  providers: [CancervizService, CancervizSeedService],
  imports: [
    CommonModule,
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
