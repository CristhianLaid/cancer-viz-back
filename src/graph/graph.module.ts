import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphController } from './controllers/graph.controller';

@Module({
  controllers: [GraphController],
  providers: [GraphService],
})
export class GraphModule {}
