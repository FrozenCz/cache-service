import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "./Cache/cache.module";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule,
    ClientsModule.register([
      {
        name: 'KAFKA_TEST',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka-1:9092']
          },
          consumer: {
            groupId: '1'
          },
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
