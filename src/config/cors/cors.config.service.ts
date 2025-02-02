import { Injectable } from "@nestjs/common";

import { ConfigService } from "@nestjs/config";
import { IConfigCors } from "./interfaces/cors.interface";
import { IEnvConfig } from "../env/interfaces/env.interface";


@Injectable()
export class CorsConfigService {
    constructor(
        private readonly configService: ConfigService<IEnvConfig>
    ){};

    getCorsConfigOptiona(): IConfigCors {
        return {
            origin: this.configService.get("CORS_ORIGIN").split(",") || '*',
            methods: this.configService.get("CORS_METHODS").split(","),
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: this.configService.get("CORS_CREDENTIALS", false),
        }
    };
};