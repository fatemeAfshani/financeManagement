import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('shareholder_checkout', (table) => {
    table.increments('id').primary()
    table.integer('companyId', 255).notNullable()
    table.integer('userId', 255)
    table.decimal('amount', 10).notNullable()
    table.string('date', 6).notNullable()
    table.string('description', 500)
    table.foreign('companyId').references('id').inTable('company')
    table.foreign('userId').references('id').inTable('user')
    table.index(['companyId'])
  })

  await knex.schema.createTable('shareholder_income', (table) => {
    table.increments('id').primary()
    table.integer('companyId', 255).notNullable()
    table.integer('orderId', 255).notNullable()
    table.integer('userId', 255)
    table.decimal('sharePercent', 10).notNullable()
    table.decimal('amount', 10).notNullable()
    table.string('date', 6).notNullable()
    table.boolean('isCompanyIncome').defaultTo(false)
    table.boolean('isSettled').defaultTo(false)
    table.string('checkoutDate')
    table.integer('checkoutId', 255)
    table.foreign('companyId').references('id').inTable('company')
    table.foreign('orderId').references('id').inTable('order')
    table.foreign('userId').references('id').inTable('user')
    table.foreign('checkoutId').references('id').inTable('shareholder_checkout')
    table.index(['companyId', 'orderId'])
  })

  const hasShareHolderColumn = await knex.schema.hasColumn(
    'user',
    'isShareHolder'
  )
  if (!hasShareHolderColumn) {
    await knex.schema.table('user', (table) => {
      table.boolean('isShareHolder').defaultTo(false)
      table.decimal('sharePercent').defaultTo(0)
      table.index('companyId')
    })
  }

  const hasSharePercentColumn = await knex.schema.hasColumn(
    'company',
    'sharePercent'
  )
  if (!hasSharePercentColumn) {
    await knex.schema.table('company', (table) => {
      table.decimal('sharePercent').defaultTo(100)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  // do nothing
}
