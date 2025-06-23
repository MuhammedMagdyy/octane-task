/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log(`Server is running on port ${port}`);
  })
  .catch((error) => {
    console.error(`Error starting the server: ${error}`);
    process.exit(1);
  });
