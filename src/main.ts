import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './app.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(SERVER_PORT);

  return SERVER_PORT;
}
bootstrap().then((value) => {
  console.log(`Todo server started on: http://127.0.0.1:${value}`);
});
