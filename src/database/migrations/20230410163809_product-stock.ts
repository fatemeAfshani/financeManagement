import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product-stock', (table) => {
    table.increments('id').primary()
    table.integer('productId', 255).notNullable()
    table.integer('amount', 10).notNullable()
    table.decimal('buyPrice', 10).notNullable()
    table.foreign('productId').references('id').inTable('product')
  })
}

export async function down(knex: Knex): Promise<void> {
  // nothing
}
