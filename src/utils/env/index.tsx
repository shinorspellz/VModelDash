import { EnvInt } from "./type";
import devEnv from "./dev";
import prodEnv from "./prod";

const config = (env: "dev" | "prod"): EnvInt => {
  const envValues: any = env === "dev" ? devEnv : prodEnv;

  return {
    env,
    isProd: env === "prod",
    ...envValues,
  };
};

export default config("dev");
