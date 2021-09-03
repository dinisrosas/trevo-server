import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(3333);

  const url = (await app.getUrl()).replace("[::1]", "localhost");
  console.log(`Application is running on: ${url}`);
}

bootstrap();
