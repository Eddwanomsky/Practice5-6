import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'dotenv/config';

const config: ConnectionOptions = {
  type: 'postgres',
  name: 'default',
  host: '127.0.0.1',
  port: 8432,
  username: process.env.POSTGRES_USER || 'walter',
  password: process.env.POSTGRES_PASSWORD || 'white',
  database: process.env.POSTGRES_DB || 'boilerplate',
  synchronize: false,
  logging: false,
  entities: ['src/orm/entities/**/*.ts'],
  migrations: ['src/orm/migrations/**/*.ts'],
  subscribers: ['src/orm/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/orm/entities',
    migrationsDir: 'src/orm/migrations',
    subscribersDir: 'src/orm/subscriber',
  },
  // Эту настройка принудительно заставляет Node.js использовать IPv4 (127.0.0.1),
  // исключая уход соединений в сетевой мост Docker (172.18.0.1):
  extra: {
    family: 4,
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
