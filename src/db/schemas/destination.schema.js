import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { accountsTable } from "./account.schema.js";
import { generateRandomUuid } from "../../utils/generateRandomUuid.js";

export const destinationTable = sqliteTable('destinations', {
    id: text('id').notNull().primaryKey().$defaultFn(() => generateRandomUuid()),
    accountId: text('account_id').notNull().references(() => accountsTable.accountId, { onDelete: 'cascade' }),
    url: text('url').notNull(),
    headers: text('headers', { mode: 'json' }).notNull(),
    httpMethod: text('http_method').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
