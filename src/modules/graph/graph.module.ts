import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common/common.module';
import { GraphService } from './services/graph.service';
import { GraphController } from './controllers/graph.controller';
import { CancervizModule } from '../cancerviz/cancerviz.module';



@Module({
  controllers: [GraphController],
  providers: [GraphService],
  imports: [
    CommonModule,
    CancervizModule,
  ]
})
export class GraphModule {}
