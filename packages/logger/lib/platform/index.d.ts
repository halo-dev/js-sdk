declare type PlatformDeps = {
    log(...args: any[]): void;
};
export declare const platformDeps: PlatformDeps;
export declare const injectPlatformDeps: (deps: Partial<PlatformDeps>) => void;
export {};
