/* eslint-disable import/no-import-module-exports */
import '../config'
import type { Knex } from 'knex'

const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } =
  process.env

const knexConfig: { [key: string]: Knex.Config } = {
  production: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      port: DB_PORT ? +DB_PORT : 5432,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },

  test: {
    client: DB_CLIENT,
    connection: {
      database: 'test_finance',
      host: DB_HOST,
      port: 5432,
      user: DB_USER,
      password: DB_PASSWORD,
    },

    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
}

module.exports = knexConfig
