import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DatabaseModule } from '../../db/database.module';
import { todoProvider } from './todo.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService, todoProvider],
})
export class TodoModule {}
