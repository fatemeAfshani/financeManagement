import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void[] | undefined[]> {
  const changes = []
  changes.push(
    knex.schema.hasColumn('product', 'price').then((exist) => {
      if (exist) {
        return knex.schema.alterTable('product', (table) => {
          table.decimal('price', 10).notNullable().alter()
        })
      }
    })
  )
  changes.push(
    knex.schema.hasColumn('product_invoice', 'pricePerOne').then((exist) => {
      if (exist) {
        return knex.schema.alterTable('product_invoice', (table) => {
          table.decimal('pricePerOne', 10).notNullable().alter()
        })
      }
    })
  )

  changes.push(
    knex.schema.hasColumn('order', 'shippingPriceCustomer').then((exist) => {
      if (exist) {
        return knex.schema.alterTable('order', (table) => {
          table.decimal('shippingPriceCustomer', 10).notNullable().alter()
          table.decimal('shippingPriceSeller', 10).notNullable().alter()
        })
      }
    })
  )

  changes.push(
    knex.schema.hasColumn('order_product', 'sellPrice').then((exist) => {
      if (exist) {
        return knex.schema.alterTable('order_product', (table) => {
          table.decimal('sellPrice', 10).notNullable().alter()
          table.decimal('buyPrice', 10).notNullable().alter()
        })
      }
    })
  )
  return Promise.all(changes)
}

export async function down(knex: Knex): Promise<void> {
  // nothing
}
