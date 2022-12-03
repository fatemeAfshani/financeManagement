import config from 'config'
import { Knex } from 'knex';

export const db = require("knex")({
    client: config.get('database.client'),
    connection: config.get('database.connection'),
    pool :{ min: 0, max: 7 }
  })as Knex;