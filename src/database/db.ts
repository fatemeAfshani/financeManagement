import config from 'config'
import knex, { Knex } from 'knex'

const db = knex({
  client: config.get('database.client'),
  connection: config.get('database.connection'),
  pool: { min: 0, max: 7 },
}) as Knex

export default db
