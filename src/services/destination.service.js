import { and, eq, ne } from "drizzle-orm";
import db from "../db/db.js"
import { destinationTable } from "../db/schemas/destination.schema.js";

export const destinationCreate = async ({ accountId, url, headers, httpMethod }) => {
    const result = await db.insert(destinationTable)
        .values({ accountId, url, headers, httpMethod })
        .returning();
    return result[0];
}

export const destinationUpdate = async (destinationId, { url, headers, httpMethod }) => {
    const result = await db.update(destinationTable)
        .set({ url, headers, httpMethod })
        .where(eq(destinationTable.id, destinationId))
        .returning();
    return result[0];
}

export const destinationDelete = async (destinationId) => {
    return await db.delete(destinationTable).where(eq(destinationTable.id, destinationId))
}

export const getDestinationDetailsById = async (destinationId) => {
    return await db.query.destinationTable.findFirst({
        where: eq(destinationTable.id, destinationId)
    })
}

export const getDestinationDetailsByAccountId = async (accountId) => {
    return await db.query.destinationTable.findMany({
        where: eq(destinationTable.accountId, accountId)
    })
}