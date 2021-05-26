export type Response<T = any> = {
  status: number | string;
  message?: string;
  devMessage?: any;
  data: T;
};

export type Environment = {
  database: string;
  mode: ModeType;
  startTime: number;
  version: string;
};

type ModeType = "PRODUCTION" | "DEVELOPMENT" | "DEMO" | "TEST";
