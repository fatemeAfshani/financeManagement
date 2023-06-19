import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasAmountColumn = await knex.schema.hasColumn('product', 'amount')
  if (hasAmountColumn) {
    await knex.schema.table('product', (table) => {
      table.dropColumn('amount')
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  // nothing
}
