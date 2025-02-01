export interface IConfigCors {
    origin:             string | string[];  // Permitir uno o varios orígenes
    methods?:           string[];           // Métodos permitidos (GET, POST, etc.)
    allowedHeaders?:    string[];           // Headers permitidos
    exposedHeaders?:    string[];           // Headers que pueden ser expuestos al cliente
    credentials?:       boolean;            // Permitir cookies o credenciales
    maxAge?:            number;             // Tiempo en segundos que el navegador puede cachear la respuesta
  }
  