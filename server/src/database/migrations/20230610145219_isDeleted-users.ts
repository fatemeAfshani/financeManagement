import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasSharePercentColumn = await knex.schema.hasColumn('user', 'isDeleted')
  if (!hasSharePercentColumn) {
    await knex.schema.table('user', (table) => {
      table.boolean('isDeleted').defaultTo(false)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  // do nothing
}
