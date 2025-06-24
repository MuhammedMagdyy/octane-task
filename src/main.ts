/* eslint-disable no-console */
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  const apiPrefix = configService.get<string>('API_PREFIX') ?? '/api';

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const apiDocumentationConfig = new DocumentBuilder()
    .setTitle('Reading Recommendations API')
    .setDescription(
      ' The Reading Recommendation System API provides a simple and efficient way for users to submit their reading intervals and get recommendations for the top-rated books in the system.',
    )
    .setVersion('1.0')
    .addSecurity('bearer', { type: 'http', scheme: 'bearer' })
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, apiDocumentationConfig);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}${apiPrefix}`);
    console.log(
      `API documentation is available at http://localhost:${port}/api-docs`,
    );
  });
}

void bootstrap();
