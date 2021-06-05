import { DATABASE_CONNECTION, TODO_REPOSITORY } from '../../app.constants';
import { Connection, Repository } from 'typeorm';
import { Todo } from './models/todo.model';
import { Provider } from '@nestjs/common';

export const todoProvider: Provider<Repository<Todo>> = {
  provide: TODO_REPOSITORY,
  useFactory: (connection: Connection) => connection.getRepository(Todo),
  inject: [DATABASE_CONNECTION],
};
