import '../config'
import knex, { Knex } from 'knex'

const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env
console.log(process.env.NODE_ENV)

const db = knex({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    port: 5432,
    user: DB_USER,
    password: DB_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? 'test_finance' : DB_NAME,
  },
  pool: { min: 0, max: 7 },
}) as Knex

export default db
