import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('product', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable().unique();
        table.integer('price', 10).notNullable();
        table.integer('amount', 10).notNullable()

        
    })
    .createTable('product_invoice', function (table) {
        table.increments('id').primary();
        table.integer('productId', 255).notNullable();
        table.integer('amount', 10).notNullable();
        table.integer('pricePerOne', 10).notNullable();
        table.string('date', 100)
        table.foreign('productId').references('id').inTable('product');

    })
    .createTable('order', function (table) {
        table.increments('id').primary();
        table.string('name', 100);
        table.string('address', 100);
        table.string('phone', 20);
        table.string('postalCode', 20);
        table.string('trackingCode', 50)
        table.string('orderDate', 6)
        table.string('shippingDate', 6)
        table.integer('shippingPriceCustomer',10).notNullable();
        table.integer('shippingPriceSeller',10).notNullable();
        table.string('totalProfit',10).notNullable();
        table.integer('discount', 10)
        table.string('sellFrom', 100);

    })
    .createTable('order_product', function (table) {
        table.increments('id').primary();
        table.integer('amount', 10).notNullable()     
        table.integer('productId', 255).notNullable();
        table.integer('orderId', 255).notNullable();
        table.integer('sellPrice', 255).notNullable();
        table.integer('buyPrice', 255).notNullable();
        table.foreign('productId').references('id').inTable('product');
        table.foreign('orderId').references('id').inTable('order');
        table.index('orderId')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("order_product")
    .dropTable("product_invoice")
    .dropTable("product")
    .dropTable("order")

}

