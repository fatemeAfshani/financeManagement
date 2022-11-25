import config from 'config'

const {client, connection} : {client : string , connection: object } = config.get('database') as {client: string , connection : object}

console.log("E#EE", client, connection)
export const db = require("knex")({
    client: config.get('database.client'),
    connection: config.get('database.connection'),
    pool :{ min: 0, max: 7 }
  });