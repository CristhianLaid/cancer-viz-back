import * as dotenv from 'dotenv'
import { IEnvConfig } from './interfaces/env.interface';

dotenv.config();

export const validateEnvConfig = (env: NodeJS.ProcessEnv): IEnvConfig => {
    const config: IEnvConfig = {
        HOST_API:           env.HOST_API as string,
        CORS_ORIGIN:        env.CORS_ORIGIN as string,
        CORS_METHODS:       env.CORS_METHODS as string,
        CORS_CREDENTIALS:   env.CORS_CREDENTIALS === 'true',
    }
    return config;
}

export const envConfig: IEnvConfig = validateEnvConfig(process.env);

