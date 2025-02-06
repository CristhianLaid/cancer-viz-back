import { Controller, Post } from "@nestjs/common";
import { CancervizSeedService } from "../services";


@Controller('cancerviz/seed')
export class CancervizSeedController {
    constructor(
        private readonly cancervizSeedService: CancervizSeedService,
    ){}

    @Post()
    seedDatabase() {
        const filename= "CancerSCEM"
        const filePath = `src/data/${filename}-Browse-Table.csv`;
        return this.cancervizSeedService.seedCancervizDatabase(filePath);
    }
}