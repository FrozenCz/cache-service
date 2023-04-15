import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { CacheService } from "./Cache/cache.service";
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import { HandleCacheDTO } from "./model/handleCacheDTO";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly cacheService: CacheService) {
  }

  @MessagePattern({cmd: 'list'})
  getHello(): string {
    return this.cacheService.showAllCacheIds();
  }

  @MessagePattern({cmd: 'create'})
  createCache(
    @Body(ValidationPipe) handleCache: HandleCacheDTO
  ): void {
    return this.cacheService.handleCache(handleCache);
  }

  @MessagePattern({cmd: 'get'})
  getCache( uuid: string ): any {
    return this.cacheService.loadCache(uuid);
  }

}
