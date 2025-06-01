import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateAppSecretToken, generateRandomUuid } from "../../utils/generateRandomUuid.js";

export const accountsTable = sqliteTable('accounts', {
    accountId: text('account_id').unique().notNull().primaryKey().$defaultFn(() => generateRandomUuid()),
    emailId: text('email_id').unique().notNull(),
    accountName: text('account_name').notNull(),
    appSecretToken: text('app_secret_token').notNull().$defaultFn(() => generateAppSecretToken()),
    website: text(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})
