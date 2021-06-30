type PlatformDeps = {
  log(...args: any[]): void;
};
export const platformDeps: PlatformDeps = {
  log(..._args: any[]) {
    throw new Error("not implemented");
  }
};
export const injectPlatformDeps = (deps: Partial<PlatformDeps>) => {
  platformDeps.log = deps.log!;
};
