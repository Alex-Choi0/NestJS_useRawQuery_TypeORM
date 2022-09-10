import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  let app: any;
  console.log('env HTTPS_KEY? : ', process.env.HTTPS_KEY);
  if (!process.env.HTTPS_KEY) {
    console.log('no https key, cert');
    app = await NestFactory.create(AppModule);
  } else {
    const httpsOptions = {
      key: fs.readFileSync(process.env.HTTPS_KEY),
      cert: fs.readFileSync(process.env.HTTPS_CERT),
    };
    app = await NestFactory.create(AppModule, { httpsOptions });
  }

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('NestJS API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  // Swagger Document의 문서를 api(/api-docs)로 설정할수 있게 셋팅
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(+process.env.NESTJS_PORT);
  console.log('NestJS Port : ', process.env.NESTJS_PORT);
}
bootstrap();
