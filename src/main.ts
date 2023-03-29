import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.verbose('APP start on port ' + port);
}
bootstrap();
