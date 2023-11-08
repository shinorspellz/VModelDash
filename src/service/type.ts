interface GetCacheInt {
  cacheKey: string;
  data: any;
  duration?: number;
}

export interface CacheFunc {
  set: (field: GetCacheInt) => Promise<boolean>;
  get: (cacheKey: string) => Promise<any>;
}
