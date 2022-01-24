import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet({ contentSecurityPolicy: false }));
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 8080);

  console.log('TEST SECRET', process.env.TEST_SECRET);
  console.log('HI', process.env.HI);
}

bootstrap();
