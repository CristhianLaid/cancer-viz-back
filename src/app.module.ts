import { Module } from '@nestjs/common';
import { GraphModule } from './graph/graph.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [GraphModule, SampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
