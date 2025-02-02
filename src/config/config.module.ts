import { Module } from "@nestjs/common";
import { CorsConfigService } from "./cors/cors.config.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [],
  providers: [CorsConfigService],
  exports: [CorsConfigService]
})

export class ConfigModule {}