export interface EnvInt {
  env: "dev" | "prod";
  isProd: boolean;
  API_BASE_URL: string;
  APP_INACTIVITY_TIMEOUT: number;
}
