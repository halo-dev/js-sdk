interface sdkOptionsInter {
  basePath: string;
}

declare const halo: {
  getRequestToken(): string;
};

declare const garoon: {
  connect: {
    halo: {
      getRequestToken(): Promise<string>;
    };
  };
};
declare const PACKAGE_VERSION: string;

declare module NodeJS {
  interface Global {
    halo: typeof halo;
    garoon: typeof garoon;
    server: typeof haloServer;
  }
}

declare const haloServer:
  | {
      host: string;
      protocol: string;
    }
  | undefined;
