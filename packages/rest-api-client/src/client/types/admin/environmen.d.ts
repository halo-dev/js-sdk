export type Environment = {
  database: string;
  mode: ModeType;
  startTime: number;
  version: string;
};

type ModeType = "PRODUCTION" | "DEVELOPMENT" | "DEMO" | "TEST";
