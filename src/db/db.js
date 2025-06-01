import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql/node';
import { schema } from './schemas/index.js';
import { createClient } from '@libsql/client';

const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
});

const db = drizzle(client, { schema: schema })

export default db;
