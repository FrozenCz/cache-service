import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

function setupSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Cache service API")
    .setDescription("This API is here for you to help you")
    .setVersion("0.1")
    .addTag("cacheService")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app);
  await app.listen(port);

  logger.verbose('APP start on port ' + port);
}
bootstrap();
