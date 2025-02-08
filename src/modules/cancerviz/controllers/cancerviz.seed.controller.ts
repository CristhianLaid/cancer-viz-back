import { Body, Controller, Post } from '@nestjs/common';
import { CancervizSeedService } from '../services';

@Controller('cancerviz/seed')
export class CancervizSeedController {
  constructor(private readonly cancervizSeedService: CancervizSeedService) {}

  @Post()
  seedDatabase() {
    const filename = 'CancerSCEM';
    const filePath = `src/data/${filename}-Browse-Table.csv`;
    return this.cancervizSeedService.seedCancervizDatabase(filePath);
  }

  @Post('unique-values/extract')
  async extractAndSave() {
    const filename = 'CancerSCEM';
    const filePath = `src/data/${filename}-Browse-Table.csv`;
    await this.cancervizSeedService.saveUniqueValues(filePath);
    return { message: 'Valores únicos guardados correctamente' };
  }
}
