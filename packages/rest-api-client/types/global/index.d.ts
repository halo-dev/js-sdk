declare const halo: {
  getRequestToken(): string;
};

declare const PACKAGE_VERSION: string;

declare module NodeJS {
  interface Global {
    halo: typeof halo;
    server: typeof haloServer;
  }
}

declare const haloServer:
  | {
    host: string;
    protocol: string;
  }
  | undefined;

declare class Blob {
  constructor(array: unknown[]);
}
