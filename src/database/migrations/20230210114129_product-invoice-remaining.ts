import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasColumn('product_invoice', 'remaining').then((exist) => {
    if (!exist) {
      return knex.schema.alterTable('product_invoice', (table) => {
        table.integer('remaining', 10)
      })
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  // do nothing
}
