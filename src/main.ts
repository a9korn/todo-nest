import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './app.constants';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
      .setTitle('Todo Alex')
      .setDescription('The Todos API description')
      .setVersion('1.0')
      .addTag('Todo')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(SERVER_PORT);

  return SERVER_PORT;
}
bootstrap().then((value) => {
  console.log(`Todo server started on: http://127.0.0.1:${value}`);
});
