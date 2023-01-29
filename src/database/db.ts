import knex, { Knex } from 'knex'

const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const db = knex({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    port: 5432,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  pool: { min: 0, max: 7 },
}) as Knex

export default db
