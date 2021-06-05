import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/**/*.model{.ts,.js}'],
  migrationsTableName: 'migrations',
  logging: false,
  synchronize: true,
  dropSchema: true,
  migrationsRun: false,
  migrationsTransactionMode: 'each',
  cache: false,
  migrations: ['src/db/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
