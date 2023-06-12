import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasUuidColumn = await knex.schema.hasColumn('company', 'uuid')
  if (!hasUuidColumn) {
    await knex.schema.table('company', (table) => {
      table.string('uuid', 100).unique().notNullable()
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  // do nothing
}
