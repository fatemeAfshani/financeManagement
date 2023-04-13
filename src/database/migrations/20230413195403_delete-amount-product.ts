import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('product', (table) => {
    table.dropColumn('amount')
  })
}

export async function down(knex: Knex): Promise<void> {
  // nothing
}
