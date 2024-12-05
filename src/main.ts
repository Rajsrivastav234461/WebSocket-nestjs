import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files (like your HTML, JS, and CSS) from the "public" folder
  app.useStaticAssets(join(__dirname, '..', 'public')); // Specify the path to the "public" folder

  await app.listen(3000);  // Start the NestJS server on port 3000
}
bootstrap();
