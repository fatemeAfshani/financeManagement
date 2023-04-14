import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('company', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable().unique()
      table.string('createdAt', 6).notNullable()
    })
    .createTable('product', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.decimal('price', 10).notNullable()
      table.integer('amount', 10).notNullable()
      table.boolean('isDeleted').defaultTo(false)
      table.integer('companyId', 255).notNullable()
      table.foreign('companyId').references('id').inTable('company')
      table.index(['companyId'])
    })
    .createTable('product_invoice', (table) => {
      table.increments('id').primary()
      table.integer('productId', 255).notNullable()
      table.integer('amount', 10).notNullable()
      table.decimal('pricePerOne', 10).notNullable()
      table.string('date', 100)
      table.integer('companyId', 255).notNullable()
      table.foreign('companyId').references('id').inTable('company')
      table.foreign('productId').references('id').inTable('product')
      table.index(['companyId', 'productId'])
    })
    .createTable('product_stock', (table) => {
      table.increments('id').primary()
      table.integer('productId', 255).notNullable()
      table.integer('amount', 10).notNullable()
      table.decimal('buyPrice', 10).notNullable()
      table.foreign('productId').references('id').inTable('product')
      table.index('productId')
    })
    .createTable('order', (table) => {
      table.increments('id').primary()
      table.string('name', 100)
      table.string('address', 100)
      table.string('phone', 20)
      table.string('postalCode', 20)
      table.string('trackingCode', 50)
      table.string('orderDate', 6)
      table.string('shippingDate', 6)
      table.decimal('shippingPriceCustomer', 10).notNullable()
      table.decimal('shippingPriceSeller', 10).notNullable()
      table.decimal('totalProfit', 10).notNullable()
      table.decimal('discount', 10)
      table.string('sellFrom', 100)
      table.integer('companyId', 255).notNullable()
      table.foreign('companyId').references('id').inTable('company')
      table.index('companyId')
    })
    .createTable('order_product', (table) => {
      table.increments('id').primary()
      table.integer('amount', 10).notNullable()
      table.integer('productId', 255).notNullable()
      table.integer('orderId', 255).notNullable()
      table.decimal('sellPrice', 255).notNullable()
      table.decimal('buyPrice', 255).notNullable()
      table.foreign('productId').references('id').inTable('product')
      table.foreign('orderId').references('id').inTable('order')
      table.index('orderId')
    })
    .createTable('user', (table) => {
      table.increments('id').primary()
      table.string('username', 100).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('role', 10).notNullable()
      table.integer('companyId', 255)
      table.foreign('companyId').references('id').inTable('company')
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('product_stock')
    .dropTable('order_product')
    .dropTable('product_invoice')
    .dropTable('product')
    .dropTable('order')
    .dropTable('user')
    .dropTable('company')
}
