import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('products', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.integer('sellPrice', 10).notNullable();
        table.integer('buyPrice', 10).notNullable();
        table.integer('amount', 10).notNullable()
        table.string('color', 100)

        
    })
    .createTable('productHistory', function (table) {
        table.increments('id').primary();
        table.integer('productId', 255).notNullable();
        table.integer('amount', 10).notNullable();
        table.integer('pricePerOne', 10).notNullable();
        table.string('color', 10)
        table.string('date', 100)
        table.foreign('productId').references('id').inTable('products');

    })
    .createTable('orders', function (table) {
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
    .createTable('orderProduct', function (table) {
        table.increments('id').primary();
        table.integer('amount', 10).notNullable()     
        table.integer('productId', 255).notNullable();
        table.integer('orderId', 255).notNullable();
        table.foreign('productId').references('id').inTable('products');
        table.foreign('orderId').references('id').inTable('orders');
        table.index('orderId')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("orderProduct")
    .dropTable("productHistory")
    .dropTable("products")
    .dropTable("orders")

}

