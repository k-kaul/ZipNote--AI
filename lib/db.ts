'use server'

import { neon } from '@neondatabase/serverless';

export async function getDbConnection() {
    if(!process.env.DATABASE_URL){
        throw new Error("Neon Db URL is not defined.")
    }

    const sql = neon(process.env.DATABASE_URL);
    console.log('this is the output of connection',sql)
    return sql;
}