import { Module } from '@nestjs/common';
import { SampleController } from './controllers/sample.controller';
import { SampleService } from './services/sample.service';
import { CancervizModule } from '../cancerviz/cancerviz.module';
@Module({
  controllers: [SampleController],
  providers: [SampleService],
  imports: [CancervizModule]
})
export class SampleModule {}
