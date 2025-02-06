import { Module } from '@nestjs/common';
import { CancervizController } from './controllers';
import { CancervizSeedService, CancervizService } from './services';
import { CommonModule } from 'src/common/common.module';
import { CancervizSeedController } from './controllers/cancerviz.seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancerviz } from './entities';

@Module({
  controllers: [CancervizController, CancervizSeedController],
  providers: [CancervizService, CancervizSeedService],
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Cancerviz])
  ]
})
export class CancervizModule {}
