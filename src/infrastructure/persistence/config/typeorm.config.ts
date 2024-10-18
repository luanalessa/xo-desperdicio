import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5434,
    "username": "yourUsername",
    "password": "yourPassword",
    "database": "yourDatabaseName",
    "synchronize": true, 
    "logging": true,
    "entities": ["src/domain/models/*.ts"],
    "migrations": ["src/infrastructure/persistence/migrations/**/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"],
    "migrationsTableName": "migrations"
  });

  AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });