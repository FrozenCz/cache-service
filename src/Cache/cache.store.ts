import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import { Cache } from "cache-manager";


@Injectable()
export class CacheStore {
  private cacheStoreLogger = new Logger('CacheStore');

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  saveCache(param: {
    key: string,
    value: any
  }): void {
    this.cacheManager.set(param.key, param.value).then(
      result => {
      },
      reason => {
        this.cacheStoreLogger.error(`Cache not saved`, reason);
      });
  }

  async getCache(key: string): Promise<any> {
    const cache = await this.cacheManager.get(key);
    if (cache) {
      return cache;
    }
    throw new BadRequestException("not found");
  }

  getCacheIds() {
    return this.cacheManager.store.keys();
  }
}
