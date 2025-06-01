import { and, eq, ne } from "drizzle-orm";
import db from "../db/db.js"
import { accountsTable } from "../db/schemas/account.schema.js"

export const accountCreate = async ({ emailId, accountName, website }) => {
    const result = await db.insert(accountsTable)
        .values({ emailId, accountName, website })
        .returning();
    return result[0];
}

export const accountUpdate = async ({ accountId, emailId, accountName, website }) => {
    const result = await db.update(accountsTable)
        .set({ emailId, accountName, website })
        .where(eq(accountsTable.accountId, accountId)).returning()
    return result[0];
}

export const accountDelete = async (accountId) => {
    return await db.delete(accountsTable).where(eq(accountsTable.accountId, accountId))
}

export const getAccountDetailsByAccountId = async (accountId) => {
    return await db.query.accountsTable.findFirst({
        where: eq(accountsTable.accountId, accountId)
    })
}

export const getAccountDetailsByEmail = async (emailId, excludeAccountId = null) => {
    const whereQuery = excludeAccountId
        ? and
            (
                eq(accountsTable.emailId, emailId),
                ne(accountsTable.accountId, excludeAccountId)
            )
        : eq(accountsTable.emailId, emailId)

    return await db.query.accountsTable.findFirst({
        where: whereQuery
    })
}

export const getAccountDetailsBySecretToken = async (secretToken) => {
    return await db.query.accountsTable.findFirst({
        where: eq(accountsTable.appSecretToken, secretToken)
    })
}

