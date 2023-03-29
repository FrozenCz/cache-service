import { Module } from "@nestjs/common";
import * as CommonCache from "@nestjs/common";
import { CacheService } from "./cache.service";
import { CacheStore } from "./cache.store";
import { HttpModule } from "@nestjs/axios";


@Module({
  imports: [
    HttpModule,
    CommonCache.CacheModule.register({ ttl: 1000 * 60 * 60, isGlobal: true })
  ],
  providers: [
    CacheStore,
    CacheService
  ],
  exports: [CacheService]
})
export class CacheModule {
}
