export interface IEnvConfig {
    HOST_API:           string;
    CORS_ORIGIN:        string;
    CORS_METHODS:       string;
    CORS_CREDENTIALS:   boolean;
    PORT:               number;
    DATABASE_URL:       string;
    NODE_ENV:           string;
    JWT_STRATEGIES:     string
};