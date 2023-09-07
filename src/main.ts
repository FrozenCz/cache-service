import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka-1:9092'],
        },
        consumer: {
          groupId: '1',
          allowAutoTopicCreation: true
        }
      }
    }
  );
  await app.listen();
  console.log('služba poslouchá')
}
setTimeout(() => {
  bootstrap();
}, 10000)

