import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "./Cache/cache.module";

@Module({
  imports: [ConfigModule.forRoot(), CacheModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
