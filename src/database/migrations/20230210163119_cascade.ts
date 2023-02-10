import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('product_invoice', (table) => {
      table.dropForeign('productId')
      table
        .foreign('productId')
        .references('id')
        .inTable('product')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
    .alterTable('order_product', (table) => {
      table.dropForeign('productId')

      table
        .foreign('productId')
        .references('id')
        .inTable('product')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
    .alterTable('order_product', (table) => {
      table.dropForeign('orderId')

      table
        .foreign('orderId')
        .references('id')
        .inTable('order')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
}

export async function down(knex: Knex): Promise<void> {
  // do nothing
}
