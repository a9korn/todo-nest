import { ConnectionOptions, createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../app.constants';
import { ConfigService } from '@nestjs/config';
import * as pg from 'pg';

pg.types.setTypeParser(20, 'text', parseInt);
pg.types.setTypeParser(1700, 'text', parseFloat);

export default {
  provide: DATABASE_CONNECTION,
  useFactory: async (configService: ConfigService) => {
    const { HOST, PORT, USER_NAME, PASSWORD, DB_NAME } = await getDbConfigLocal(
      configService,
    );

    const databaseConfig: ConnectionOptions = {
      name: 'main_database_connection',
      type: 'postgres',
      host: HOST,
      port: +PORT,
      username: USER_NAME,
      password: PASSWORD,
      database: DB_NAME,
      entities: [__dirname + '/../**/**.model{.ts,.js}'],
      synchronize: true,
      dropSchema: false,
      migrationsRun: false,
      migrationsTransactionMode: 'each',
      logging: false,
      cache: false,
      logger: 'advanced-console',
      migrations: ['dist/src/db/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'dist/src/db/migrations',
      },
    };
    return await createConnection(databaseConfig);
  },
  inject: [ConfigService],
};

interface IPgDbConfig {
  readonly HOST: string;
  readonly PORT: string;
  readonly USER_NAME: string;
  readonly PASSWORD: string;
  readonly DB_NAME: string;
}

const getDbConfigLocal = async (
  configService: ConfigService,
): Promise<IPgDbConfig> => {
  return {
    HOST: await configService.get('POSTGRES_HOST'),
    PORT: await configService.get('POSTGRES_PORT'),
    USER_NAME: await configService.get('POSTGRES_USER'),
    PASSWORD: await configService.get('POSTGRES_PASSWORD'),
    DB_NAME: await configService.get('POSTGRES_DB'),
  };
};
