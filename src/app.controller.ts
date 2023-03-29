import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { CacheService } from "./Cache/cache.service";
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import { HandleCacheDTO } from "./model/handleCacheDTO";

@Controller()
export class AppController {
  constructor(private readonly cacheService: CacheService) {
  }

  @Get()
  getHello(): string {
    return this.cacheService.showAllCacheIds();
  }

  @ApiOperation({summary: 'This is endpoint for cache creating'})
  @ApiParam({
    name: 'Vytvořeni cache',
  })
  @Post()
  createCache(
    @Body(ValidationPipe) handleCache: HandleCacheDTO
  ): void {
    return this.cacheService.handleCache(handleCache);
  }

  @Get('/:uuid')
  getCache(
    @Param('uuid') uuid: string
  ): any {
    return this.cacheService.loadCache(uuid);
  }



}
