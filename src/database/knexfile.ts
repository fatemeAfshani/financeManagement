import type { Knex } from "knex";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: "finance",
      host: "127.0.0.1",
      port: 5432,
      user: "fateme",
      password: "aztprsst",
  },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"

    }
  },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }

};

module.exports = knexConfig;
