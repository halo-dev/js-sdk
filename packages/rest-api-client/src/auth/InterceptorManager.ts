import { ResolvedFn, RejectedFn } from "../types/auth";

interface Interceptor<T> {
  resolved: ResolvedFn<T>;
  rejected?: RejectedFn;
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>;
  constructor() {
    this.interceptors = [];
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected,
    });
    return this.interceptors.length - 1;
  }

  eject(id: number): void {
    this.interceptors[id] = null;
  }

  forEach(fn: (interceptor: Interceptor<T>) => void) {
    this.interceptors.forEach((interceptor) => {
      if (interceptor === null) return;
      fn(interceptor);
    });
  }
}
