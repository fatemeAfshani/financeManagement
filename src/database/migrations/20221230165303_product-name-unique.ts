import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasColumn('product', 'name').then((exist) => {
    if (exist) {
      return knex.schema.alterTable('product', (table) => {
        table.string('name', 255).unique().alter()
      })
    }
    return knex.schema.alterTable('product', (table) => {
      table.string('name', 255).notNullable().unique()
    })
  })
}

export async function down(knex: Knex): Promise<void> {
  // do nothing
}
