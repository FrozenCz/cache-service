import { Body, Controller, Get, Inject, Logger, Param, Post, ValidationPipe } from "@nestjs/common";
import { CacheService } from "./Cache/cache.service";
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import { HandleCacheDTO } from "./model/handleCacheDTO";
import { ClientKafka, EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { Client } from "@nestjs/microservices/external/nats-client.interface";




@Controller()
export class AppController {
  constructor(private readonly cacheService: CacheService,
              @Inject('KAFKA_TEST')
              private client: ClientKafka) {
  }

  onModuleInit() {
    const logger = new Logger('APP_CONTROLLER');
    logger.verbose('ANO DĚJU SE');
    // this.client.to
    this.client.subscribeToResponseOf('mytopic')
  }

  // @MessagePattern({cmd: 'list'})
  getHello(): string {
    return this.cacheService.showAllCacheIds();
  }

  // @MessagePattern('mytopic')
  @EventPattern('mytopic')
  createCache(
    @Payload() handleCache: HandleCacheDTO
  ): void {
    console.log('yep message received', handleCache);
    // return this.cacheService.handleCache(handleCache);
  }

  // @MessagePattern({cmd: 'get'})
  // getCache( uuid: string ): any {
  //   return this.cacheService.loadCache(uuid);
  // }

}
